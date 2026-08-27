import { IndentOption } from '../types/json';

export function sortObjectKeys(data: unknown): unknown {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(sortObjectKeys);
  }

  const obj = data as Record<string, unknown>;
  const sortedKeys = Object.keys(obj).sort((a, b) => a.localeCompare(b));
  const result: Record<string, unknown> = {};

  for (const key of sortedKeys) {
    result[key] = sortObjectKeys(obj[key]);
  }

  return result;
}

export function sortJsonKeys(input: string, indent: IndentOption = '2'): string {
  if (!input || input.trim() === '') {
    return '';
  }

  const parsed = JSON.parse(input);
  const sorted = sortObjectKeys(parsed);
  const space = indent === 'tab' ? '\t' : parseInt(indent, 10);
  return JSON.stringify(sorted, null, space);
}
