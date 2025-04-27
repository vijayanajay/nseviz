// Jest unit test for tooltip/modal HTML generation (no D3 dependency)
const {
  getTreemapTooltipHTML,
  getTreemapModalHTML,
  formatChange,
  formatVolume,
  formatMarketCap
} = require('../main.js');

describe('Treemap Tooltip/Modal HTML', () => {
  const mockData = {
    name: 'HDFC Bank',
    symbol: 'HDFCBANK',
    change: 1.23,
    price: 1600.5,
    volume: 12345678,
    pe: 20.1,
    marketCap: 1000000000000
  };
  it('renders correct tooltip HTML', () => {
    const html = getTreemapTooltipHTML(mockData);
    expect(html).toContain('HDFC Bank');
    expect(html).toContain('Price Change');
    expect(html).toContain('+1.23%');
    expect(html).toContain('₹1600.5');
    expect(html).toContain('12.3 M');
    expect(html).toContain('20.1');
    expect(html).toContain('1.00 T');
  });
  it('renders correct modal HTML', () => {
    const html = getTreemapModalHTML(mockData);
    expect(html).toContain('HDFC Bank');
    expect(html).toContain('Price Change');
    expect(html).toContain('+1.23%');
    expect(html).toContain('₹1600.5');
    expect(html).toContain('12.3 M');
    expect(html).toContain('20.1');
    expect(html).toContain('1.00 T');
    expect(html).toContain('button');
  });
  it('formats values as expected', () => {
    expect(formatChange(2.5)).toBe('+2.50%');
    expect(formatChange(-2.5)).toBe('-2.50%');
    expect(formatVolume(15000000)).toBe('15.0 M');
    expect(formatVolume(25000)).toBe('25.0 K');
    expect(formatMarketCap(2e12)).toBe('2.00 T');
    expect(formatMarketCap(5e9)).toBe('5.00 B');
  });
});
