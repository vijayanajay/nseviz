// Cypress UI test for Tabs component (TDD, minimal)
// Assumes Tabs present in index.html as <div class="tabs"><button class="tab active">Overview</button><button class="tab">Details</button></div>

describe('Tabs component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders Tabs with correct classes and active state', () => {
    cy.get('.tabs').should('exist');
    cy.get('.tab').should('have.length', 2);
    cy.get('.tab.active').should('contain.text', 'Overview');
  });
});
