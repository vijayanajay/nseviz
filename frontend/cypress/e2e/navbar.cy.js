describe('Navbar UI', () => {
  beforeEach(() => {
    cy.visit('frontend/index.html');
  });

  it('shows logo, title, and date', () => {
    cy.get('#navbar').should('exist');
    cy.get('#logo').should('have.attr', 'src', 'logo.svg');
    cy.get('.navbar-title').contains('Indian Stock Market Heatmap');
    cy.get('#date').should('be.visible');
  });
});
