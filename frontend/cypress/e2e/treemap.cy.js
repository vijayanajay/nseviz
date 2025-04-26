// Cypress UI test for D3 treemap rendering

describe('Treemap UI', () => {
  beforeEach(() => {
    cy.visit('/index.html'); // Fixed path for static server
  });
  it('renders D3 treemap with mock data', () => {
    cy.window().then(win => {
      win.renderTreemap([
        { name: 'A', value: 100 },
        { name: 'B', value: 60 },
        { name: 'C', value: 40 }
      ]);
    });
    cy.get('#treemap svg').should('exist');
    cy.get('#treemap rect').should('have.length.greaterThan', 0);
    cy.get('#treemap text').should('have.length.greaterThan', 0);
  });
});
