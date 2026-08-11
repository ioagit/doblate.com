import { describe, expect, it } from 'vitest';
import {
  formatLevelNumber,
  formatScientific,
  formatSpanishInteger,
  formatPowerOfTwo,
  toSuperscript,
} from '../utils/numberFormat';

describe('numberFormat', () => {
  it('formats Spanish thousands separators', () => {
    expect(formatSpanishInteger(1024)).toBe('1.024');
    expect(formatSpanishInteger(65536)).toBe('65.536');
    expect(formatSpanishInteger(1_048_576n)).toBe('1.048.576');
  });

  it('formats power-of-two superscripts', () => {
    expect(formatPowerOfTwo(7)).toBe(`2${toSuperscript(7)}`);
    expect(formatPowerOfTwo(10)).toContain('2');
  });

  it('uses scientific notation for very large numbers', () => {
    const formatted = formatLevelNumber(100);
    expect(formatted.useScientific).toBe(true);
    expect(formatted.display).toMatch(/× 10/);
    expect(formatted.power).toBe(formatPowerOfTwo(100));
    expect(formatted.digits).toBe(31);
  });

  it('keeps full decimal form for smaller numbers', () => {
    const formatted = formatLevelNumber(16);
    expect(formatted.useScientific).toBe(false);
    expect(formatted.display).toBe('65.536');
  });

  it('builds Spanish scientific strings', () => {
    const sci = formatScientific(10);
    expect(sci).toContain('× 10');
    expect(sci.includes(',') || sci.includes('1')).toBe(true);
  });
});
