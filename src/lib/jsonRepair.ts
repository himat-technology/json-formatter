export interface RepairResult {
  repairedText: string;
  success: boolean;
  message: string;
}

export function repairJson(input: string): RepairResult {
  if (!input || input.trim() === '') {
    return {
      repairedText: '',
      success: false,
      message: 'Input is empty.',
    };
  }

  // First check if it's already valid JSON
  try {
    JSON.parse(input);
    return {
      repairedText: input,
      success: true,
      message: 'JSON is already valid.',
    };
  } catch {
    // Proceed with auto-repair
  }

  let text = input;

  // Step 1: Remove comments (single line // and multi-line /* */) preserving strings
  text = stripComments(text);

  // Step 2: Replace Python/JS keywords outside strings
  text = replaceKeywords(text);

  // Step 3: Replace single quotes with double quotes safely
  text = fixSingleQuotes(text);

  // Step 4: Quote unquoted object keys
  text = quoteUnquotedKeys(text);

  // Step 5: Remove trailing commas
  text = removeTrailingCommas(text);

  // Step 6: Fix missing closing brackets / braces
  text = fixMissingBrackets(text);

  // Final verification
  try {
    const parsed = JSON.parse(text);
    return {
      repairedText: JSON.stringify(parsed, null, 2),
      success: true,
      message: 'JSON auto-repaired successfully.',
    };
  } catch {
    return {
      repairedText: input,
      success: false,
      message: 'Could not safely repair JSON without data corruption.',
    };
  }
}

/**
 * Strips JS style comments without touching comment characters inside strings.
 */
function stripComments(input: string): string {
  let result = '';
  let inString = false;
  let stringChar = '';
  let i = 0;

  while (i < input.length) {
    const char = input[i];
    const nextChar = input[i + 1];

    if (inString) {
      result += char;
      if (char === '\\') {
        // Escaped character inside string
        i++;
        if (i < input.length) {
          result += input[i];
        }
      } else if (char === stringChar) {
        inString = false;
      }
      i++;
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
      result += char;
      i++;
      continue;
    }

    // Check single-line comment //
    if (char === '/' && nextChar === '/') {
      i += 2;
      while (i < input.length && input[i] !== '\n' && input[i] !== '\r') {
        i++;
      }
      continue;
    }

    // Check multi-line comment /* ... */
    if (char === '/' && nextChar === '*') {
      i += 2;
      while (i < input.length - 1 && !(input[i] === '*' && input[i + 1] === '/')) {
        i++;
      }
      i += 2;
      continue;
    }

    result += char;
    i++;
  }

  return result;
}

/**
 * Replaces True, False, None, undefined with true, false, null outside strings.
 */
function replaceKeywords(input: string): string {
  let result = '';
  let inString = false;
  let stringChar = '';
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (inString) {
      result += char;
      if (char === '\\') {
        i++;
        if (i < input.length) result += input[i];
      } else if (char === stringChar) {
        inString = false;
      }
      i++;
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
      result += char;
      i++;
      continue;
    }

    // Check word boundaries for keywords
    const remaining = input.slice(i);
    const match = remaining.match(/^(True|False|None|undefined|NaN)\b/);
    if (match) {
      const word = match[1];
      if (word === 'True') result += 'true';
      else if (word === 'False') result += 'false';
      else if (word === 'None' || word === 'undefined' || word === 'NaN') result += 'null';
      i += word.length;
      continue;
    }

    result += char;
    i++;
  }

  return result;
}

/**
 * Converts single-quoted strings and keys to double-quoted strings.
 */
function fixSingleQuotes(input: string): string {
  let result = '';
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (char === "'") {
      // Convert single quote to double quote
      result += '"';
      i++;
      while (i < input.length) {
        const c = input[i];
        if (c === '\\') {
          // Escaped character inside single quote
          const next = input[i + 1];
          if (next === "'") {
            // Escaped single quote becomes unescaped single quote inside double quotes
            result += "'";
            i += 2;
          } else if (next === '"') {
            // Unescaped double quote inside double quotes must be escaped
            result += '\\"';
            i += 2;
          } else {
            result += c;
            i++;
          }
        } else if (c === "'") {
          result += '"';
          i++;
          break;
        } else if (c === '"') {
          result += '\\"';
          i++;
        } else {
          result += c;
          i++;
        }
      }
      continue;
    }

    if (char === '"') {
      result += char;
      i++;
      while (i < input.length) {
        const c = input[i];
        result += c;
        if (c === '\\') {
          i++;
          if (i < input.length) result += input[i];
        } else if (c === '"') {
          i++;
          break;
        }
        i++;
      }
      continue;
    }

    result += char;
    i++;
  }

  return result;
}

/**
 * Quotes unquoted object keys (e.g. { foo: 123 } -> { "foo": 123 })
 */
function quoteUnquotedKeys(input: string): string {
  // Regex to match unquoted object key pattern: ({ or , or \n) followed by whitespace, then key, then :
  return input.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, '$1"$2"$3');
}

/**
 * Removes trailing commas in objects and arrays (e.g., `, }` or `, ]`)
 */
function removeTrailingCommas(input: string): string {
  let result = input;
  // Repeat to handle nested trailing commas
  for (let pass = 0; pass < 3; pass++) {
    result = result.replace(/,(\s*[}\]])/g, '$1');
  }
  return result;
}

/**
 * Fixes missing closing braces/brackets at the end of input.
 */
function fixMissingBrackets(input: string): string {
  const stack: string[] = [];
  let inString = false;
  let i = 0;

  while (i < input.length) {
    const char = input[i];
    if (inString) {
      if (char === '\\') {
        i += 2;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      i++;
      continue;
    }

    if (char === '"') {
      inString = true;
      i++;
      continue;
    }

    if (char === '{' || char === '[') {
      stack.push(char);
    } else if (char === '}') {
      if (stack.length > 0 && stack[stack.length - 1] === '{') {
        stack.pop();
      }
    } else if (char === ']') {
      if (stack.length > 0 && stack[stack.length - 1] === '[') {
        stack.pop();
      }
    }
    i++;
  }

  let appended = input.trim();
  // Remove trailing comma if present before appending missing closing brackets
  appended = appended.replace(/,\s*$/, '');

  while (stack.length > 0) {
    const top = stack.pop();
    if (top === '{') appended += '}';
    if (top === '[') appended += ']';
  }

  return appended;
}
