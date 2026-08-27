import { describe, it, expect } from 'vitest';
import { sortJsonKeys, sortObjectKeys } from '../src/lib/jsonSorter';

describe('jsonSorter', () => {
  it('sorts object keys alphabetically', () => {
    const input = { z: 1, name: 'John', age: 30 };
    const sorted = sortObjectKeys(input) as Record<string, unknown>;
    expect(Object.keys(sorted)).toEqual(['age', 'name', 'z']);
  });

  it('recursively sorts nested objects while preserving array order', () => {
    const input = {
      user: {
        z_prop: 'val',
        a_prop: 'val',
        tags: ['zebra', 'apple', 'banana'],
      },
      b_root: 123,
    };

    const sortedString = sortJsonKeys(JSON.stringify(input));
    const parsed = JSON.parse(sortedString);

    expect(Object.keys(parsed)).toEqual(['b_root', 'user']);
    expect(Object.keys(parsed.user)).toEqual(['a_prop', 'tags', 'z_prop']);
    // Array items must preserve order
    expect(parsed.user.tags).toEqual(['zebra', 'apple', 'banana']);
  });
});
