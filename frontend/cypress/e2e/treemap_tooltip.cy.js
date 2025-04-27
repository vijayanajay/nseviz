// Cypress UI test for D3 treemap tooltip and interactivity

describe('Treemap Tooltip/Interactivity', () => {
  beforeEach(() => {
    cy.visit('/index.html');
    cy.wait(500); // Ensure scripts and DOM are loaded
  });

  it('shows tooltip on hover (desktop)', () => {
    cy.window().then(win => {
      win.renderTreemap([
        { name: 'HDFC Bank', symbol: 'HDFCBANK', value: 100, change: 1.2, price: 1600.5, volume: 12300000, pe: 20.1, marketCap: 1000000000000 }
      ]);
    });
    cy.get('#treemap rect').first().trigger('mouseover');
    cy.get('.treemap-tooltip').should('exist');
    cy.get('.treemap-tooltip').should('contain.text', 'HDFC Bank');
    cy.get('#treemap rect').first().trigger('mouseout');
    cy.get('.treemap-tooltip').should('not.exist');
  });

  it('shows modal sheet on tap (mobile)', () => {
    cy.viewport(375, 667); // iPhone 6/7/8
    cy.window().then(win => {
      win.renderTreemap([
        { name: 'Infosys', symbol: 'INFY', value: 80, change: -1.5, price: 1400.2, volume: 5000000, pe: 25.2, marketCap: 500000000000 }
      ]);
    });
    cy.get('#treemap rect').first().click();
    cy.get('.treemap-modal').should('exist');
    cy.get('.treemap-modal').should('contain.text', 'Infosys');
    cy.get('.treemap-modal').click();
    cy.get('.treemap-modal').should('not.exist');
  });
});
