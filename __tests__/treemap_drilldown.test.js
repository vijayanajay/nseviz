/**
 * @jest-environment jsdom
 */

// Import main.js once to avoid multiple imports
const mainModule = require('../frontend/main.js');

describe('Treemap Sector Drilldown', () => {
  // Mock D3 for testing
  global.d3 = {
    select: jest.fn(() => ({
      append: jest.fn().mockReturnThis(),
      attr: jest.fn().mockReturnThis(),
      selectAll: jest.fn().mockReturnThis()
    })),
    selectAll: jest.fn().mockReturnThis(),
    data: jest.fn().mockReturnThis(),
    enter: jest.fn().mockReturnThis(),
    append: jest.fn().mockReturnThis(),
    attr: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
    join: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis(),
    hierarchy: jest.fn().mockReturnValue({
      sum: jest.fn().mockReturnThis(),
      leaves: jest.fn().mockReturnValue([])
    }),
    treemap: jest.fn().mockReturnValue(function() {
      return {
        leaves: () => []
      };
    })
  };

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <div id="treemap"></div>
      <div id="sector-filter"></div>
      <select id="index-dropdown"><option value="NIFTY50">Nifty 50</option></select>
      <select id="sector-dropdown"><option value="FINANCE">Finance</option></select>
    `;
    
    // Reset and mock functions
    jest.resetAllMocks();
    window.fetchHeatmapData = jest.fn().mockResolvedValue([]);
    window.loadHeatmapData = jest.fn().mockResolvedValue([]);
    window.mapApiDataToTreemap = jest.fn().mockReturnValue([]);
    
    // Set handleSectorClick function for testing
    window.handleSectorClick = mainModule.handleSectorClick;
    
    // Mock d3 in window
    window.d3 = global.d3;
  });

  it('should have handleSectorClick function defined', () => {
    expect(typeof window.handleSectorClick).toBe('function');
  });

  it('should update API parameters when sector is clicked', async () => {
    // Setup test data
    const testSector = 'FINANCE';
    const mockEvent = { preventDefault: jest.fn() };
    const mockData = { sector: testSector };
    
    // Call the function directly
    await window.handleSectorClick(mockEvent, mockData);
    
    // Verify API was called with correct parameters
    expect(window.loadHeatmapData).toHaveBeenCalledWith(
      expect.objectContaining({ sector: testSector })
    );
  });

  it('should process sector information from treemap data', () => {
    const testData = [
      { name: 'Stock1', value: 100, change: 1.5, sector: 'FINANCE' }
    ];
    
    // Test that sector information is preserved in mapApiDataToTreemap
    const mockApiData = [{
      name: 'Stock1',
      symbol: 'STOCK1',
      market_cap: 1000000,
      change: 1.5,
      sector: 'FINANCE'
    }];
    
    window.mapApiDataToTreemap = mainModule.mapApiDataToTreemap;
    const result = window.mapApiDataToTreemap(mockApiData);
    
    expect(result[0].sector).toBe('FINANCE');
  });
}); 