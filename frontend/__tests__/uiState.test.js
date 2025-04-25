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
