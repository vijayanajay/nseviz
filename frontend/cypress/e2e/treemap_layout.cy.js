// F7.4: Responsive grid layout test for #treemap
// Checks 12 columns on desktop, 1 column on mobile

describe('Treemap Grid Layout Responsiveness', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have 12 grid columns on desktop', () => {
    cy.viewport(1280, 800);
    cy.get('#treemap').should('have.css', 'display', 'grid');
    cy.get('#treemap')
      .invoke('css', 'grid-template-columns')
      .then((val) => {
        // 12 columns means 11 spaces between columns ("repeat(12, 1fr)"), so 12 values
        expect(val.split(' ').length).to.eq(12);
      });
  });

  it('should have 1 grid column on mobile', () => {
    cy.viewport(375, 700);
    cy.get('#treemap')
      .invoke('css', 'grid-template-columns')
      .then((val) => {
        // 1 column means a single value
        expect(val.split(' ').length).to.eq(1);
      });
  });
});
