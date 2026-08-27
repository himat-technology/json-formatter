import { IndentOption } from '../types/json';

export function formatJson(input: string, indent: IndentOption = '2'): string {
  if (!input || input.trim() === '') {
    return '';
  }

  const parsed = JSON.parse(input);
  const space = indent === 'tab' ? '\t' : parseInt(indent, 10);
  return JSON.stringify(parsed, null, space);
}

export function minifyJson(input: string): string {
  if (!input || input.trim() === '') {
    return '';
  }

  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}
