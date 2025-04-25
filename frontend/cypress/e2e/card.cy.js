// Cypress UI test for Card component (TDD, minimal)
// Assumes Card is present in index.html as <div class="card">Test Card</div>

describe('Card component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders Card with correct class and content', () => {
    cy.get('.card').should('exist').and('contain.text', 'Test Card');
  });
});
