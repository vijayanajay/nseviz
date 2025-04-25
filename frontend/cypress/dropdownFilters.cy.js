// Cypress UI tests for F8.2: Dropdown filters

describe('Dropdown Filters UI', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows index and sector dropdowns', () => {
    cy.get('#index-dropdown').should('exist');
    cy.get('#sector-dropdown').should('exist');
  });

  it('changing dropdown triggers API call and updates heatmap', () => {
    cy.intercept('GET', '/api/heatmap-data*').as('fetchHeatmap');
    cy.get('#index-dropdown').select('NIFTYBANK');
    cy.wait('@fetchHeatmap').its('request.url').should('include', 'index=NIFTYBANK');
    cy.get('#sector-dropdown').select('IT');
    cy.wait('@fetchHeatmap').its('request.url').should('include', 'sector=IT');
    // Optionally check heatmap update
    cy.get('#heatmap').should('exist');
  });

  it('shows error state on API failure', () => {
    cy.intercept('GET', '/api/heatmap-data*', { statusCode: 500 }).as('fetchHeatmap');
    cy.get('#index-dropdown').select('NIFTY50');
    cy.wait('@fetchHeatmap');
    cy.get('#error-message').should('be.visible');
  });

  it('dropdowns are usable on mobile and desktop', () => {
    cy.viewport('iphone-6');
    cy.get('#index-dropdown').should('be.visible');
    cy.get('#sector-dropdown').should('be.visible');
    cy.viewport('macbook-15');
    cy.get('#index-dropdown').should('be.visible');
    cy.get('#sector-dropdown').should('be.visible');
  });
});
