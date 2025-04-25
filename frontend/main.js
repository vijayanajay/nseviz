// Entry point for frontend JS (empty for now, per TDD)

// Minimal implementation for Index Selector segmented control (for TDD)
window.renderIndexSelector = function(indices = ['NIFTY50', 'NIFTYBANK', 'NIFTYIT']) {
  const container = document.getElementById('index-selector');
  if (!container) return;
  container.innerHTML = '';
  indices.forEach((idx, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('data-index', idx);
    btn.textContent = idx.replace('NIFTY', 'Nifty ').replace('BANK', 'Bank').replace('IT', 'IT');
    btn.className = i === 0 ? 'active' : '';
    btn.addEventListener('click', function() {
      // Remove active class from all
      container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Dispatch custom event
      const evt = new CustomEvent('indexchange', { detail: idx });
      container.dispatchEvent(evt);
    });
    container.appendChild(btn);
  });
};

// Date Picker Logic (F7.3)
let datePickerValue = '';

function setupDatePicker() {
  const input = document.getElementById('datepicker');
  if (!input) return;
  input.value = '';
  input.addEventListener('change', () => {
    datePickerValue = input.value;
  });
  input.addEventListener('focus', () => {
    input.classList.add('focus');
  });
  input.addEventListener('blur', () => {
    input.classList.remove('focus');
  });
}

function getDatePickerValue() {
  return datePickerValue;
}

// Fetch heatmap data from backend API (F8.1)
function fetchHeatmapData(params = {}) {
  const q = new URLSearchParams();
  if (params.category) q.append('category', params.category);
  if (params.index) q.append('index', params.index);
  if (params.sector) q.append('sector', params.sector);
  if (params.date) q.append('date', params.date);
  const url = '/api/heatmap-data?' + q.toString();
  return fetch(url, { method: 'GET' })
    .then(res => {
      if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
      return res.json();
    });
}

// --- Loading & Error UI Logic (F8.2) ---
function showLoadingSpinner() {
  const el = document.getElementById('loading-spinner');
  if (el) el.hidden = false;
}
function hideLoadingSpinner() {
  const el = document.getElementById('loading-spinner');
  if (el) el.hidden = true;
}
function showErrorMessage(msg) {
  const el = document.getElementById('error-message');
  if (el) {
    el.textContent = msg;
    el.hidden = false;
  }
}
function hideErrorMessage() {
  const el = document.getElementById('error-message');
  if (el) {
    el.textContent = '';
    el.hidden = true;
  }
}

// Minimal wrapper to fetch heatmap data and manage UI states
window.loadHeatmapData = function(params = {}) {
  hideErrorMessage();
  showLoadingSpinner();
  return fetchHeatmapData(params)
    .then(data => {
      hideLoadingSpinner();
      // TODO: render data to treemap
      return data;
    })
    .catch(err => {
      hideLoadingSpinner();
      showErrorMessage(err.message || 'Failed to load data');
      throw err;
    });
};

// Export for Jest tests (CommonJS compatibility)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setupDatePicker,
    getDatePickerValue,
    fetchHeatmapData,
    showLoadingSpinner,
    hideLoadingSpinner,
    showErrorMessage,
    hideErrorMessage
  };
}

// Attach test button event for Cypress-driven UI event
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    setupDatePicker();
    const btn = document.getElementById('test-load-btn');
    if (btn) {
      btn.addEventListener('click', () => window.loadHeatmapData());
    }
  });
}
