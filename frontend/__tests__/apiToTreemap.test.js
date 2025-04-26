// Jest test for API-to-treemap integration (F9.2)
const { mapApiDataToTreemap } = require('../main.js');

describe('mapApiDataToTreemap', () => {
  it('maps API data to D3 treemap format', () => {
    const apiData = [
      { symbol: 'HDFCBANK', name: 'HDFC Bank', change: 1.2 },
      { symbol: 'INFY', name: 'Infosys', change: -0.5 },
      { symbol: 'TCS', name: 'TCS', change: 0 }
    ];
    const result = mapApiDataToTreemap(apiData);
    expect(result).toEqual([
      { name: 'HDFCBANK', value: 1.2 },
      { name: 'INFY', value: 0.5 },
      { name: 'TCS', value: 0 }
    ]);
  });

  it('handles missing change field', () => {
    const apiData = [
      { symbol: 'FOO' },
      { name: 'Bar' }
    ];
    const result = mapApiDataToTreemap(apiData);
    expect(result).toEqual([
      { name: 'FOO', value: 1 },
      { name: 'Bar', value: 1 }
    ]);
  });

  it('returns empty array if input is not array', () => {
    expect(mapApiDataToTreemap(null)).toEqual([]);
    expect(mapApiDataToTreemap(undefined)).toEqual([]);
    expect(mapApiDataToTreemap({})).toEqual([]);
  });
});
