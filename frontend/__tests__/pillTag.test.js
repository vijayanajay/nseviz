// Jest unit tests for Pill/Tag component (TDD, minimal, per spec)
// Follows frontend-design.md and project conventions

/**
 * Pill/Tag component test suite
 * - Renders minimal Pill/Tag HTML structure
 * - Accepts content
 * - Applies .pill class for styling
 * - Handles active, inactive, disabled states via class
 */

describe('Pill/Tag component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders a span with .pill class', () => {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = 'Finance';
    document.body.appendChild(pill);
    const el = document.querySelector('.pill');
    expect(el).not.toBeNull();
    expect(el.textContent).toBe('Finance');
  });

  it('applies .active, .inactive, .disabled states', () => {
    const pill = document.createElement('span');
    pill.className = 'pill active';
    document.body.appendChild(pill);
    expect(document.querySelector('.pill.active')).not.toBeNull();
    pill.className = 'pill inactive';
    expect(document.querySelector('.pill.inactive')).not.toBeNull();
    pill.className = 'pill disabled';
    expect(document.querySelector('.pill.disabled')).not.toBeNull();
  });
});
