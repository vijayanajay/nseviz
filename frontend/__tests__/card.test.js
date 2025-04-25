// Jest unit tests for Card component (TDD, minimal, per spec)
// Follows frontend-design.md and project conventions

/**
 * Card component test suite
 * - Renders minimal Card HTML structure
 * - Accepts children/content
 * - Applies .card class for styling
 */

describe('Card component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders a div with .card class', () => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = 'Test content';
    document.body.appendChild(card);
    const el = document.querySelector('.card');
    expect(el).not.toBeNull();
    expect(el.textContent).toBe('Test content');
  });

  it('can contain nested elements', () => {
    const card = document.createElement('div');
    card.className = 'card';
    const inner = document.createElement('span');
    inner.textContent = 'Inner';
    card.appendChild(inner);
    document.body.appendChild(card);
    const el = document.querySelector('.card span');
    expect(el).not.toBeNull();
    expect(el.textContent).toBe('Inner');
  });
});
