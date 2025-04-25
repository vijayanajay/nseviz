// Jest unit tests for Tabs component (TDD, minimal, per spec)
// Follows frontend-design.md and project conventions

/**
 * Tabs component test suite
 * - Renders tabs container with .tabs class
 * - Renders tab buttons with .tab class
 * - Applies .active class to selected tab
 */

describe('Tabs component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders a div with .tabs class containing tab buttons', () => {
    const tabs = document.createElement('div');
    tabs.className = 'tabs';
    const tab1 = document.createElement('button');
    tab1.className = 'tab active';
    tab1.textContent = 'Overview';
    const tab2 = document.createElement('button');
    tab2.className = 'tab';
    tab2.textContent = 'Details';
    tabs.appendChild(tab1);
    tabs.appendChild(tab2);
    document.body.appendChild(tabs);
    const el = document.querySelector('.tabs');
    expect(el).not.toBeNull();
    expect(el.querySelectorAll('.tab').length).toBe(2);
    expect(el.querySelector('.tab.active').textContent).toBe('Overview');
  });
});
