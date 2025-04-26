// Jest unit test for D3 treemap rendering (minimal contract test)
const { renderTreemap } = require('../main.js');

describe('renderTreemap', () => {
  it('is defined and callable', () => {
    expect(typeof renderTreemap).toBe('function');
    // Should not throw with empty data
    expect(() => renderTreemap([])).not.toThrow();
    // Should not throw with mock data
    expect(() => renderTreemap([{ name: 'A', value: 100 }])).not.toThrow();
  });
});
