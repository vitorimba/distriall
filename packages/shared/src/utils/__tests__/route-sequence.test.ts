import { describe, it, expect } from 'vitest';
import { reassignSequences } from '../delivery';

interface Item {
  id: string;
  sequence: number;
  name: string;
}

describe('reassignSequences', () => {
  it('returns empty array unchanged', () => {
    expect(reassignSequences([])).toEqual([]);
  });

  it('assigns sequence 1 to single item', () => {
    const items: Item[] = [{ id: 'a', sequence: 5, name: 'Item A' }];
    const result = reassignSequences(items);
    expect(result[0].sequence).toBe(1);
    expect(result[0].id).toBe('a');
    expect(result[0].name).toBe('Item A');
  });

  it('reassigns sequences starting from 1', () => {
    const items: Item[] = [
      { id: 'a', sequence: 3, name: 'A' },
      { id: 'b', sequence: 1, name: 'B' },
      { id: 'c', sequence: 2, name: 'C' },
    ];
    const result = reassignSequences(items);
    expect(result[0].sequence).toBe(1);
    expect(result[1].sequence).toBe(2);
    expect(result[2].sequence).toBe(3);
  });

  it('preserves item order (does not sort by original sequence)', () => {
    const items: Item[] = [
      { id: 'c', sequence: 3, name: 'C' },
      { id: 'a', sequence: 1, name: 'A' },
      { id: 'b', sequence: 2, name: 'B' },
    ];
    const result = reassignSequences(items);
    expect(result[0].id).toBe('c');
    expect(result[0].sequence).toBe(1);
    expect(result[1].id).toBe('a');
    expect(result[1].sequence).toBe(2);
    expect(result[2].id).toBe('b');
    expect(result[2].sequence).toBe(3);
  });

  it('does not mutate original array', () => {
    const items: Item[] = [
      { id: 'a', sequence: 10, name: 'A' },
      { id: 'b', sequence: 20, name: 'B' },
    ];
    const result = reassignSequences(items);
    expect(items[0].sequence).toBe(10);
    expect(items[1].sequence).toBe(20);
    expect(result[0].sequence).toBe(1);
    expect(result[1].sequence).toBe(2);
  });

  it('handles gap-free assignment for large arrays', () => {
    const items: Item[] = Array.from({ length: 10 }, (_, i) => ({
      id: `item-${i}`,
      sequence: (i + 1) * 10,
      name: `Item ${i}`,
    }));
    const result = reassignSequences(items);
    result.forEach((item, index) => {
      expect(item.sequence).toBe(index + 1);
    });
  });
});
