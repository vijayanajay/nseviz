// Cypress E2E test for Heatmap Color Legend UI

describe('Heatmap Color Legend UI', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the heatmap color legend with correct color stops and labels', () => {
    cy.get('[data-testid="heatmap-legend"]').should('be.visible');
    cy.get('[data-testid="heatmap-legend"] .legend-swatch').should('have.length', 6);
    const labels = [
      '< -3%',
      '-1% to -3%',
      '0% to -1%',
      '0% to +1%',
      '+1% to +3%',
      '> +3%'
    ];
    labels.forEach((label, idx) => {
      cy.get('[data-testid="heatmap-legend"] .legend-label').eq(idx).should('contain', label);
    });
  });

  it('should be responsive and visible on mobile', () => {
    cy.viewport('iphone-6');
    cy.get('[data-testid="heatmap-legend"]').should('be.visible');
    cy.get('[data-testid="heatmap-legend"] .legend-swatch').should('have.length', 6);
  });
});
