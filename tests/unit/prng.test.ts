import { describe, expect, it } from 'vitest';
import { hashSeed, seededRandom } from '../../src/core/prng';

describe('deterministic procedural seed', () => {
  it('repeats the same sequence for the same payload and theme', () => {
    const a = seededRandom(hashSeed('payload:sakura'));
    const b = seededRandom(hashSeed('payload:sakura'));
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it('changes when payload or theme changes', () => {
    expect(hashSeed('payload:sakura')).not.toBe(hashSeed('payload:ocean'));
  });
});
