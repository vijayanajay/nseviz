// Jest unit tests for F8.2: Dropdown filters (index, sector) with D3.js
import { renderDropdownFilters, fetchHeatmapData } from '../main';

// Setup a DOM for D3
beforeEach(() => {
  document.body.innerHTML = `
    <select id="index-dropdown"></select>
    <select id="sector-dropdown"></select>
    <div id="heatmap"></div>
    <div id="loading-spinner" hidden></div>
    <div id="error-message" hidden></div>
  `;
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('Dropdown Filters', () => {
  it('renders index and sector dropdowns from options', () => {
    renderDropdownFilters({
      indices: ['NIFTY50', 'NIFTYBANK'],
      sectors: ['FINANCE', 'IT'],
    });
    const indexOptions = Array.from(document.getElementById('index-dropdown').options).map(o => o.value);
    const sectorOptions = Array.from(document.getElementById('sector-dropdown').options).map(o => o.value);
    expect(indexOptions).toEqual(['NIFTY50', 'NIFTYBANK']);
    expect(sectorOptions).toEqual(['FINANCE', 'IT']);
  });

  it('calls fetchHeatmapData with correct params on dropdown change', () => {
    const onChange = jest.fn();
    renderDropdownFilters({
      indices: ['NIFTY50'],
      sectors: ['FINANCE', 'IT'],
      onChange
    });
    const sectorSel = document.getElementById('sector-dropdown');
    sectorSel.value = 'IT';
    sectorSel.dispatchEvent(new Event('change'));
    expect(onChange).toHaveBeenCalledWith({ sector: 'IT' });
  });

  it('updates DOM with new data after fetch', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ symbol: 'HDFCBANK', name: 'HDFC Bank' }]
    });
    const data = await fetchHeatmapData({ index: 'NIFTY50', sector: 'FINANCE' });
    expect(data).toEqual([{ symbol: 'HDFCBANK', name: 'HDFC Bank' }]);
  });

  it('shows loading and error states', async () => {
    // Loading
    const spinner = document.getElementById('loading-spinner');
    spinner.hidden = true;
    const show = require('../main').showLoadingSpinner;
    show();
    expect(spinner.hidden).toBe(false);
    // Error
    const errorDiv = document.getElementById('error-message');
    errorDiv.hidden = true;
    const showErr = require('../main').showErrorMessage;
    showErr('Failed');
    expect(errorDiv.hidden).toBe(false);
    expect(errorDiv.textContent).toBe('Failed');
  });
});
