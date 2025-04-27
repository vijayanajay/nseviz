// Jest test for API-to-treemap integration (F9.2+F9.3)
const { mapApiDataToTreemap, getSizeForMarketCap } = require('../main.js');

describe('mapApiDataToTreemap', () => {
  it('maps API data to D3 treemap format with log-scaled market cap', () => {
    const apiData = [
      { symbol: 'HDFCBANK', name: 'HDFC Bank', market_cap: 10000000000, change: 1.2 },
      { symbol: 'INFY', name: 'Infosys', market_cap: 5000000000, change: -0.5 },
      { symbol: 'TCS', name: 'TCS', market_cap: 0, change: 0 }, // should be filtered out
      { symbol: 'XYZ', name: 'XYZ Ltd', change: 1.0 } // missing market_cap, should be filtered out
    ];
    const result = mapApiDataToTreemap(apiData);
    expect(result).toEqual([
      {
        name: 'HDFC Bank',
        symbol: 'HDFCBANK',
        value: getSizeForMarketCap(10000000000),
        change: 1.2
      },
      {
        name: 'Infosys',
        symbol: 'INFY',
        value: getSizeForMarketCap(5000000000),
        change: -0.5
      }
    ]);
  });

  it('returns empty array if no valid market cap', () => {
    const apiData = [
      { symbol: 'FOO' },
      { name: 'Bar' },
      { symbol: 'ZERO', market_cap: 0 }
    ];
    const result = mapApiDataToTreemap(apiData);
    expect(result).toEqual([]);
  });

  it('returns empty array if input is not array', () => {
    expect(mapApiDataToTreemap(null)).toEqual([]);
    expect(mapApiDataToTreemap(undefined)).toEqual([]);
    expect(mapApiDataToTreemap({})).toEqual([]);
  });
});
