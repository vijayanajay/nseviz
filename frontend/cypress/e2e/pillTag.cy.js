// Cypress UI test for Pill/Tag component (TDD, minimal)
// Assumes Pill/Tag is present in index.html as <span class="pill active">Finance</span>

describe('Pill/Tag component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders Pill/Tag with correct class and content', () => {
    cy.get('.pill').should('exist').and('contain.text', 'Finance');
  });
  it('applies active, inactive, disabled states', () => {
    cy.get('.pill.active').should('exist');
    cy.get('.pill.inactive').should('exist');
    cy.get('.pill.disabled').should('exist');
  });
});
