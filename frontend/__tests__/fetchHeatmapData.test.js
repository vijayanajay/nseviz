// Jest test for fetchHeatmapData (F8.1)
const { fetchHeatmapData } = require('../main');

global.fetch = jest.fn();

describe('fetchHeatmapData', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('calls /api/heatmap-data with correct query params', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [{ symbol: 'HDFCBANK' }] })
    });
    const params = { category: 'sector', index: 'NIFTY50', sector: 'FINANCE', date: '2024-04-01' };
    await fetchHeatmapData(params);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/heatmap-data?'),
      expect.any(Object)
    );
    const url = fetch.mock.calls[0][0];
    expect(url).toContain('category=sector');
    expect(url).toContain('index=NIFTY50');
    expect(url).toContain('sector=FINANCE');
    expect(url).toContain('date=2024-04-01');
  });

  it('returns parsed JSON data on success', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [{ symbol: 'HDFCBANK' }] })
    });
    const data = await fetchHeatmapData({ index: 'NIFTY50' });
    expect(data).toEqual({ data: [{ symbol: 'HDFCBANK' }] });
  });

  it('throws on network error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network fail'));
    await expect(fetchHeatmapData({ index: 'NIFTY50' })).rejects.toThrow('Network fail');
  });

  it('throws on non-OK response', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 400, statusText: 'Bad Request' });
    await expect(fetchHeatmapData({ index: 'NIFTY50' })).rejects.toThrow('API error: 400 Bad Request');
  });
});
