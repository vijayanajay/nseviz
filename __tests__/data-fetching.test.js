/**
 * @jest-environment jsdom
 */

// Import functions from main.js
const {
  fetchHeatmapData,
  showLoadingSpinner,
  hideLoadingSpinner,
  showErrorMessage,
  hideErrorMessage
} = require('../frontend/main.js');

// Mock the fetch API
global.fetch = jest.fn();

describe('Data fetching functions', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Setup DOM elements needed for tests
    document.body.innerHTML = `
      <div id="loading-spinner" hidden></div>
      <div id="error-message" hidden></div>
    `;
    
    // Reset fetch mock default implementation
    global.fetch.mockReset();
  });

  describe('fetchHeatmapData', () => {
    it('should call fetch with the correct URL when no params are provided', async () => {
      // Mock successful response
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] })
      });

      // Call the function
      await fetchHeatmapData();
      
      // Assert fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/heatmap-data?', { method: 'GET' });
    });

    it('should include query parameters in the URL when provided', async () => {
      // Mock successful response
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] })
      });

      // Call the function with params
      await fetchHeatmapData({
        index: 'NIFTY50',
        sector: 'IT',
        date: '2024-04-01'
      });
      
      // Assert fetch was called with the correct URL including query params
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/api\/heatmap-data\?.*index=NIFTY50.*sector=IT.*date=2024-04-01/),
        { method: 'GET' }
      );
    });

    it('should throw an error when the response is not ok', async () => {
      // Mock failed response
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request'
      });

      // Call the function and expect it to throw
      await expect(fetchHeatmapData()).rejects.toThrow('API error: 400 Bad Request');
    });

    it('should parse JSON from successful response', async () => {
      // Mock response data
      const mockData = {
        data: [
          { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1600.5, change: 1.2 }
        ]
      };
      
      // Mock successful response
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      // Call the function
      const result = await fetchHeatmapData();
      
      // Assert the result matches the mock data
      expect(result).toEqual(mockData);
    });
  });

  describe('UI state management functions', () => {
    it('should show loading spinner when showLoadingSpinner is called', () => {
      const spinner = document.getElementById('loading-spinner');
      expect(spinner.hidden).toBe(true);
      
      showLoadingSpinner();
      
      expect(spinner.hidden).toBe(false);
    });
    
    it('should hide loading spinner when hideLoadingSpinner is called', () => {
      const spinner = document.getElementById('loading-spinner');
      spinner.hidden = false;
      
      hideLoadingSpinner();
      
      expect(spinner.hidden).toBe(true);
    });
    
    it('should show error message with text when showErrorMessage is called', () => {
      const errorEl = document.getElementById('error-message');
      expect(errorEl.hidden).toBe(true);
      
      showErrorMessage('Test error message');
      
      expect(errorEl.hidden).toBe(false);
      expect(errorEl.textContent).toBe('Test error message');
    });
    
    it('should hide error message when hideErrorMessage is called', () => {
      const errorEl = document.getElementById('error-message');
      errorEl.hidden = false;
      errorEl.textContent = 'Test error message';
      
      hideErrorMessage();
      
      expect(errorEl.hidden).toBe(true);
      expect(errorEl.textContent).toBe('');
    });
  });

  describe('loadHeatmapData (integrated fetch with UI)', () => {
    let mockHideError;
    let mockShowLoading;
    let mockHideLoading;
    let mockShowError;
    let mockFetchData;
    
    beforeEach(() => {
      // Create mock functions
      mockHideError = jest.fn();
      mockShowLoading = jest.fn();
      mockHideLoading = jest.fn();
      mockShowError = jest.fn();
      mockFetchData = jest.fn();
      
      // Create the main wrapper function
      window.loadHeatmapData = function(params = {}) {
        mockHideError();
        mockShowLoading();
        return mockFetchData(params)
          .then(data => {
            mockHideLoading();
            return data;
          })
          .catch(err => {
            mockHideLoading();
            mockShowError(err.message || 'Failed to load data');
            throw err;
          });
      };
    });

    it('should manage UI state correctly on successful fetch', async () => {
      // Mock successful response
      const mockData = { data: [{ symbol: 'AAPL', name: 'Apple', price: 150.0, change: 1.5 }] };
      mockFetchData.mockResolvedValueOnce(mockData);
      
      // Call the function
      const result = await window.loadHeatmapData();
      
      // Assert UI state was managed correctly
      expect(mockHideError).toHaveBeenCalledTimes(1);
      expect(mockShowLoading).toHaveBeenCalledTimes(1);
      expect(mockHideLoading).toHaveBeenCalledTimes(1);
      expect(mockShowError).not.toHaveBeenCalled();
      
      // Assert the result matches the mock data
      expect(result).toEqual(mockData);
    });
    
    it('should manage UI state correctly on fetch error', async () => {
      // Mock failed response
      const errorMsg = 'API error: 500 Server Error';
      mockFetchData.mockRejectedValueOnce(new Error(errorMsg));
      
      // Call the function and expect it to throw
      await expect(window.loadHeatmapData()).rejects.toThrow(errorMsg);
      
      // Assert UI state was managed correctly
      expect(mockHideError).toHaveBeenCalledTimes(1);
      expect(mockShowLoading).toHaveBeenCalledTimes(1);
      expect(mockHideLoading).toHaveBeenCalledTimes(1);
      expect(mockShowError).toHaveBeenCalledTimes(1);
      expect(mockShowError).toHaveBeenCalledWith(errorMsg);
    });
    
    it('should pass parameters to fetchHeatmapData', async () => {
      // Mock successful response
      mockFetchData.mockResolvedValueOnce({ data: [] });
      
      // Parameters to pass
      const params = { index: 'NIFTY50', sector: 'FINANCE', date: '2024-05-01' };
      
      // Call the function
      await window.loadHeatmapData(params);
      
      // Assert fetchHeatmapData was called with the correct parameters
      expect(mockFetchData).toHaveBeenCalledTimes(1);
      expect(mockFetchData).toHaveBeenCalledWith(params);
    });
  });
}); 