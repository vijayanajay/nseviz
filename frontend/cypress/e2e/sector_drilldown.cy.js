describe('Sector Drilldown', () => {
  beforeEach(() => {
    // Visit the app
    cy.visit('http://localhost:3000');
    
    // Intercept API requests
    cy.intercept('GET', '/api/heatmap-data*', (req) => {
      // Return different mock data based on sector parameter
      if (req.query.sector === 'FINANCE') {
        return {
          statusCode: 200,
          body: [
            { name: 'HDFC Bank', symbol: 'HDFCBANK', price: 1450, change: 2.5, sector: 'FINANCE', volume: 1000000, marketCap: 5000000000 },
            { name: 'ICICI Bank', symbol: 'ICICIBANK', price: 950, change: 1.2, sector: 'FINANCE', volume: 800000, marketCap: 4000000000 }
          ]
        };
      } else {
        return {
          statusCode: 200,
          body: [
            { name: 'HDFC Bank', symbol: 'HDFCBANK', price: 1450, change: 2.5, sector: 'FINANCE', volume: 1000000, marketCap: 5000000000 },
            { name: 'ICICI Bank', symbol: 'ICICIBANK', price: 950, change: 1.2, sector: 'FINANCE', volume: 800000, marketCap: 4000000000 },
            { name: 'TCS', symbol: 'TCS', price: 3500, change: -1.5, sector: 'IT', volume: 500000, marketCap: 12000000000 },
            { name: 'Infosys', symbol: 'INFY', price: 1650, change: -0.8, sector: 'IT', volume: 600000, marketCap: 7000000000 }
          ]
        };
      }
    }).as('getHeatmapData');
  });

  it('should filter treemap when clicking on a sector', () => {
    // Wait for initial data load
    cy.wait('@getHeatmapData');
    
    // Check that treemap has 4 elements initially
    cy.get('#treemap rect').should('have.length.at.least', 4);
    
    // Click on a finance sector element
    cy.get('#treemap rect[data-sector="FINANCE"]').first().click();
    
    // Wait for filtered data
    cy.wait('@getHeatmapData');
    
    // Verify API was called with correct sector parameter
    cy.get('@getHeatmapData.all').then((interceptions) => {
      const lastCall = interceptions[interceptions.length - 1];
      expect(lastCall.request.url).to.include('sector=FINANCE');
    });
    
    // Check that treemap now shows only finance sector elements (2)
    cy.get('#treemap rect').should('have.length', 2);
    cy.get('#treemap rect').each(($rect) => {
      expect($rect.attr('data-sector')).to.equal('FINANCE');
    });
  });
}); 