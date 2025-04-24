// Jest + jsdom test for Index Selector segmented control
// TDD: Write test before implementation

// Import the implementation for testing
require('../main.js');

describe('Index Selector UI', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="index-selector"></div>
    `;
  });

  it('renders buttons for each index', () => {
    const indices = ['NIFTY50', 'NIFTYBANK', 'NIFTYIT'];
    window.renderIndexSelector(indices);
    indices.forEach(idx => {
      const btn = document.querySelector(`button[data-index="${idx}"]`);
      expect(btn).not.toBeNull();
      expect(btn.textContent).toMatch(/Nifty|Bank|IT/i);
    });
  });

  it('fires event and updates active state on click', () => {
    const indices = ['NIFTY50', 'NIFTYBANK'];
    window.renderIndexSelector(indices);
    const btn = document.querySelector('button[data-index="NIFTYBANK"]');
    btn.click();
    expect(btn.classList.contains('active')).toBe(true);
    // Only one active at a time
    const activeBtns = document.querySelectorAll('#index-selector .active');
    expect(activeBtns.length).toBe(1);
  });

  it('dispatches custom event with selected index', () => {
    const indices = ['NIFTY50', 'NIFTYBANK'];
    window.renderIndexSelector(indices);
    const btn = document.querySelector('button[data-index="NIFTYBANK"]');
    let received = null;
    document.getElementById('index-selector').addEventListener('indexchange', (e) => {
      received = e.detail;
    });
    btn.click();
    expect(received).toBe('NIFTYBANK');
  });
});
