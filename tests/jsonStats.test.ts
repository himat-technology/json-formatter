import { describe, it, expect } from 'vitest';
import { calculateJsonStats } from '../src/lib/jsonStats';

describe('jsonStats', () => {
  it('calculates statistics for sample JSON payload', () => {
    const input = JSON.stringify({
      product: 'HiMat',
      stats: {
        users: 100,
        active: true,
      },
      tags: ['a', 'b'],
    });

    const stats = calculateJsonStats(input);

    expect(stats.payloadSizeBytes).toBeGreaterThan(0);
    expect(stats.totalKeys).toBe(5); // product, stats, tags, users, active(wait: top level: product, stats, tags = 3. inside stats: users, active = 2. Total object keys = 5)
    expect(stats.maxDepth).toBe(3); // root -> stats -> users/active
    expect(stats.totalNodes).toBeGreaterThan(5);
  });

  it('handles empty input gracefully', () => {
    const stats = calculateJsonStats('');
    expect(stats.payloadSizeBytes).toBe(0);
    expect(stats.totalNodes).toBe(0);
    expect(stats.totalKeys).toBe(0);
    expect(stats.maxDepth).toBe(0);
  });
});
