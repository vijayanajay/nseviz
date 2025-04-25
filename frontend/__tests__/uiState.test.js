// Jest unit tests for loading/error UI logic (F8.2)
const {
  showLoadingSpinner,
  hideLoadingSpinner,
  showErrorMessage,
  hideErrorMessage
} = require('../main.js');

describe('UI State Functions', () => {
  let spinner, error;
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="loading-spinner" hidden>Loading…</div>
      <div id="error-message" hidden></div>
    `;
    spinner = document.getElementById('loading-spinner');
    error = document.getElementById('error-message');
  });

  test('showLoadingSpinner unhides spinner', () => {
    showLoadingSpinner();
    expect(spinner.hidden).toBe(false);
  });
  test('hideLoadingSpinner hides spinner', () => {
    spinner.hidden = false;
    hideLoadingSpinner();
    expect(spinner.hidden).toBe(true);
  });
  test('showErrorMessage sets text and unhides', () => {
    showErrorMessage('Oops');
    expect(error.textContent).toBe('Oops');
    expect(error.hidden).toBe(false);
  });
  test('hideErrorMessage clears text and hides', () => {
    error.textContent = 'Err';
    error.hidden = false;
    hideErrorMessage();
    expect(error.textContent).toBe('');
    expect(error.hidden).toBe(true);
  });
});

// Integration tests for loadHeatmapData (F8.4)
describe('loadHeatmapData integration', () => {
  let spinner, error;
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="loading-spinner" hidden>Loading…</div>
      <div id="error-message" hidden></div>
    `;
    spinner = document.getElementById('loading-spinner');
    error = document.getElementById('error-message');
    // Ensure window is set up for tests
    window.fetch = undefined;
  });

  test('shows spinner during fetch, hides after success', async () => {
    const mockData = [{ symbol: 'A', name: 'Alpha' }];
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );
    const promise = window.loadHeatmapData();
    expect(spinner.hidden).toBe(false); // Spinner visible immediately
    await promise;
    expect(spinner.hidden).toBe(true); // Spinner hidden after
    expect(error.hidden).toBe(true);   // No error
  });

  test('shows error message and hides spinner on fetch failure', async () => {
    window.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 500, statusText: 'Server Error' }));
    await expect(window.loadHeatmapData()).rejects.toThrow();
    expect(spinner.hidden).toBe(true); // Spinner hidden after error
    expect(error.hidden).toBe(false);  // Error visible
    expect(error.textContent).toMatch(/API error/);
  });

  test('shows error message and hides spinner on network error', async () => {
    window.fetch = jest.fn(() => Promise.reject(new Error('Network fail')));
    await expect(window.loadHeatmapData()).rejects.toThrow();
    expect(spinner.hidden).toBe(true);
    expect(error.hidden).toBe(false);
    expect(error.textContent).toMatch(/Network fail/);
  });
});
