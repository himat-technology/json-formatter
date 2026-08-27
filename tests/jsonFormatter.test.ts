import { describe, it, expect } from 'vitest';
import { formatJson, minifyJson } from '../src/lib/jsonFormatter';
import { validateJson } from '../src/lib/jsonValidator';

describe('jsonFormatter', () => {
  it('formats valid JSON with 2 spaces indent', () => {
    const input = '{"name":"John","age":30,"active":true}';
    const output = formatJson(input, '2');
    expect(output).toBe('{\n  "name": "John",\n  "age": 30,\n  "active": true\n}');
  });

  it('formats valid JSON with 4 spaces indent', () => {
    const input = '{"name":"John"}';
    const output = formatJson(input, '4');
    expect(output).toBe('{\n    "name": "John"\n}');
  });

  it('formats valid JSON with Tab indent', () => {
    const input = '{"name":"John"}';
    const output = formatJson(input, 'tab');
    expect(output).toBe('{\n\t"name": "John"\n}');
  });

  it('minifies JSON removing whitespace', () => {
    const input = `{\n  "name": "John",\n  "age": 30\n}`;
    const output = minifyJson(input);
    expect(output).toBe('{"name":"John","age":30}');
  });

  it('validates correct JSON syntax', () => {
    const res = validateJson('{"a": 1, "b": [1, 2, 3]}');
    expect(res.isValid).toBe(true);
    expect(res.error).toBeUndefined();
  });

  it('returns useful error for invalid JSON', () => {
    const res = validateJson('{"name":"John",}');
    expect(res.isValid).toBe(false);
    expect(res.error).toBeDefined();
  });
});
