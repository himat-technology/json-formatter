import { JsonStats } from '../types/json';

export function formatByteSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

export function calculateJsonStats(input: string): JsonStats {
  if (!input || input.trim() === '') {
    return {
      payloadSizeFormatted: '0 B',
      payloadSizeBytes: 0,
      totalNodes: 0,
      totalKeys: 0,
      maxDepth: 0,
    };
  }

  // Calculate payload size in bytes (UTF-8)
  const bytes = new TextEncoder().encode(input).length;
  const payloadSizeFormatted = formatByteSize(bytes);

  try {
    const parsed = JSON.parse(input);
    let totalNodes = 0;
    let totalKeys = 0;
    let maxDepth = 0;

    const walk = (data: unknown, currentDepth: number): void => {
      if (currentDepth > maxDepth) {
        maxDepth = currentDepth;
      }
      totalNodes++;

      if (data === null || typeof data !== 'object') {
        // Primitive node
        return;
      }

      if (Array.isArray(data)) {
        for (const item of data) {
          walk(item, currentDepth + 1);
        }
      } else {
        const keys = Object.keys(data as Record<string, unknown>);
        totalKeys += keys.length;
        for (const key of keys) {
          walk((data as Record<string, unknown>)[key], currentDepth + 1);
        }
      }
    };

    walk(parsed, 1);

    return {
      payloadSizeFormatted,
      payloadSizeBytes: bytes,
      totalNodes,
      totalKeys,
      maxDepth,
    };
  } catch {
    // If invalid JSON, still report raw byte size but 0 for parsed nodes
    return {
      payloadSizeFormatted,
      payloadSizeBytes: bytes,
      totalNodes: 0,
      totalKeys: 0,
      maxDepth: 0,
    };
  }
}
