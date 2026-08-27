import { ValidationResult } from '../types/json';

export function validateJson(jsonString: string): ValidationResult {
  if (!jsonString || jsonString.trim() === '') {
    return {
      isValid: false,
      error: 'Input is empty. Please paste or upload JSON content.',
    };
  }

  try {
    JSON.parse(jsonString);
    return { isValid: true };
  } catch (err: unknown) {
    let message = 'Invalid JSON format.';
    let line: number | undefined;
    let column: number | undefined;

    if (err instanceof Error) {
      message = err.message;
      
      // Try extracting position from standard V8 syntax errors ("at position X")
      const posMatch = message.match(/at position (\d+)/i);
      if (posMatch && posMatch[1]) {
        const pos = parseInt(posMatch[1], 10);
        const lines = jsonString.slice(0, pos).split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }

      // Try extracting line and column if explicitly provided by V8/SpiderMonkey
      const lineColMatch = message.match(/line (\d+) column (\d+)/i);
      if (lineColMatch) {
        line = parseInt(lineColMatch[1], 10);
        column = parseInt(lineColMatch[2], 10);
      }

      // Clean up common error message prefixes
      message = message.replace(/^JSON\.parse:\s*/i, '');
      message = message.replace(/^Unexpected token\s*/i, 'Unexpected character ');
    }

    return {
      isValid: false,
      error: message,
      line,
      column,
    };
  }
}
