// Cypress UI test for loading/error states (F8.2)
describe('Loading and Error UI States', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('shows and hides loading spinner during fetch', () => {
    cy.window().then(win => {
      // Simulate slow fetch
      const origFetch = win.fetchHeatmapData;
      win.fetchHeatmapData = () => new Promise(res => setTimeout(() => res({ ok: true }), 300));
    });
    cy.get('#loading-spinner').should('have.attr', 'hidden');
    cy.get('#test-load-btn').click({force: true});
    cy.get('#loading-spinner').should('not.have.attr', 'hidden');
    cy.wait(350);
    cy.get('#loading-spinner').should('have.attr', 'hidden');
    cy.window().then(win => {
      win.fetchHeatmapData = win.fetchHeatmapData && win.fetchHeatmapData.__orig || win.fetchHeatmapData;
    });
  });

  it('shows error message if fetch fails', () => {
    cy.window().then(win => {
      const origFetch = win.fetchHeatmapData;
      win.fetchHeatmapData = () => Promise.reject(new Error('API fail'));
      cy.get('#error-message').should('not.be.visible');
      win.loadHeatmapData().catch(() => {});
      cy.get('#error-message').should('be.visible').and('contain', 'API fail');
      win.fetchHeatmapData = origFetch;
    });
  });
});
