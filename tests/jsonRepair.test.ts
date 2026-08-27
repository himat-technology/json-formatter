import { describe, it, expect } from 'vitest';
import { repairJson } from '../src/lib/jsonRepair';

describe('jsonRepair', () => {
  it('repairs single quoted strings', () => {
    const input = "{'name': 'John', 'active': 'true'}";
    const res = repairJson(input);
    expect(res.success).toBe(true);
    expect(JSON.parse(res.repairedText)).toEqual({ name: 'John', active: 'true' });
  });

  it('repairs unquoted object keys', () => {
    const input = '{name: "John", age: 30}';
    const res = repairJson(input);
    expect(res.success).toBe(true);
    expect(JSON.parse(res.repairedText)).toEqual({ name: 'John', age: 30 });
  });

  it('repairs trailing commas in objects and arrays', () => {
    const input = '{"name": "John", "skills": ["React", "TS",],}';
    const res = repairJson(input);
    expect(res.success).toBe(true);
    expect(JSON.parse(res.repairedText)).toEqual({ name: 'John', skills: ['React', 'TS'] });
  });

  it('strips JS style single-line and multi-line comments', () => {
    const input = `
      // User metadata
      {
        /* Primary name */
        "name": "John", // End of line comment
        "age": 30
      }
    `;
    const res = repairJson(input);
    expect(res.success).toBe(true);
    expect(JSON.parse(res.repairedText)).toEqual({ name: 'John', age: 30 });
  });

  it('replaces Python keywords True, False, None', () => {
    const input = '{"active": True, "archived": False, "deleted": None}';
    const res = repairJson(input);
    expect(res.success).toBe(true);
    expect(JSON.parse(res.repairedText)).toEqual({ active: true, archived: false, deleted: null });
  });

  it('repairs missing closing brackets', () => {
    const input = '{"product": "HiMat", "items": [1, 2, 3';
    const res = repairJson(input);
    expect(res.success).toBe(true);
    expect(JSON.parse(res.repairedText)).toEqual({ product: 'HiMat', items: [1, 2, 3] });
  });
});
