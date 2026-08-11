import { describe, expect, it } from 'vitest';
import {
  digitCount,
  doubleValue,
  leadingDigits,
  powerOfTwo,
} from '../utils/bigIntMath';

describe('bigIntMath / doubling', () => {
  it('computes exact powers of two with BigInt', () => {
    expect(powerOfTwo(0)).toBe(1n);
    expect(powerOfTwo(10)).toBe(1024n);
    expect(powerOfTwo(20)).toBe(1_048_576n);
    expect(powerOfTwo(100).toString()).toBe(
      '1267650600228229401496703205376',
    );
  });

  it('doubles values exactly', () => {
    expect(doubleValue(1n)).toBe(2n);
    expect(doubleValue(1024n)).toBe(2048n);
    expect(doubleValue(powerOfTwo(60))).toBe(powerOfTwo(61));
  });

  it('counts decimal digits', () => {
    expect(digitCount(0)).toBe(1);
    expect(digitCount(10)).toBe(4); // 1024
    expect(digitCount(20)).toBe(7); // 1048576
    expect(digitCount(100)).toBe(31);
  });

  it('computes leading digits for scientific notation', () => {
    const { mantissa, powerOfTen } = leadingDigits(10);
    expect(powerOfTen).toBe(3);
    expect(mantissa).toBeGreaterThanOrEqual(1);
    expect(mantissa).toBeLessThan(10);
  });
});
