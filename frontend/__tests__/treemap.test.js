// Jest unit test for D3 treemap rendering (minimal contract test)
const { renderTreemap, getColorForChange, getSizeForMarketCap } = require('../main.js');

describe('renderTreemap', () => {
  it('is defined and callable', () => {
    expect(typeof renderTreemap).toBe('function');
    // Should not throw with empty data
    expect(() => renderTreemap([])).not.toThrow();
    // Should not throw with mock data
    expect(() => renderTreemap([{ name: 'A', value: 100 }])).not.toThrow();
  });
});

describe('getColorForChange', () => {
  it('returns correct color for change %', () => {
    expect(getColorForChange(-4)).toBe('#E02424'); // Deep Red
    expect(getColorForChange(-2)).toBe('#EF4444'); // Mid Red
    expect(getColorForChange(-0.5)).toBe('#F87171'); // Light Red
    expect(getColorForChange(0.5)).toBe('#34D399'); // Light Green
    expect(getColorForChange(2)).toBe('#10B981'); // Mid Green
    expect(getColorForChange(4)).toBe('#059669'); // Deep Green
  });
});

describe('getSizeForMarketCap', () => {
  it('returns a positive number for positive market cap', () => {
    expect(getSizeForMarketCap(1000000000)).toBeGreaterThan(0);
    expect(getSizeForMarketCap(0)).toBe(0);
  });
  it('returns 0 for negative/invalid market cap', () => {
    expect(getSizeForMarketCap(-100)).toBe(0);
    expect(getSizeForMarketCap(undefined)).toBe(0);
    expect(getSizeForMarketCap(null)).toBe(0);
  });
});
