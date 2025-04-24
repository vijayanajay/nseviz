/**
 * @jest-environment jsdom
 */

describe('Navbar', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <nav id="navbar">
        <img src="logo.svg" alt="NSEViz Logo" id="logo" width="36" height="36">
        <span class="navbar-title">Indian Stock Market Heatmap</span>
        <span id="date">2025-04-25</span>
      </nav>
    `;
  });

  it('renders logo, title, and date', () => {
    const logo = document.getElementById('logo');
    const title = document.querySelector('.navbar-title');
    const date = document.getElementById('date');
    expect(logo).toBeTruthy();
    expect(title).toBeTruthy();
    expect(title.textContent).toMatch(/Indian Stock Market Heatmap/);
    expect(date).toBeTruthy();
    expect(date.textContent).toMatch(/2025-04-25/);
  });
});
