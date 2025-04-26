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

// Debounce utility (F8.5)
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// --- Dropdown Filters (F8.2 + F8.5 debounce) ---
// Minimal implementation for TDD: renders <select> for index and sector using D3.js
window.renderDropdownFilters = function({ indices = [], sectors = [], onChange = () => {} }) {
  // Use window.d3 (from CDN) in browser
  const d3 = window.d3;
  // Index dropdown
  const indexSel = d3.select('#index-dropdown');
  indexSel.selectAll('option').remove();
  indexSel.selectAll('option')
    .data(indices)
    .join('option')
    .attr('value', d => d)
    .text(d => d);
  // Debounced handler
  const debouncedOnChange = debounce(onChange, 300);
  indexSel.on('change', function() {
    debouncedOnChange({ index: this.value });
  });

  // Sector dropdown
  const sectorSel = d3.select('#sector-dropdown');
  sectorSel.selectAll('option').remove();
  sectorSel.selectAll('option')
    .data(sectors)
    .join('option')
    .attr('value', d => d)
    .text(d => d);
  sectorSel.on('change', function() {
    debouncedOnChange({ sector: this.value });
  });
};

window.defaultIndices = ['NIFTY50', 'NIFTYBANK'];
window.defaultSectors = ['FINANCE', 'IT'];

function updateHeatmap(data) {
  const container = document.getElementById('heatmap');
  if (!container) return;
  container.innerHTML = '';
  if (!Array.isArray(data)) return;
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'heatmap-cell';
    div.textContent = item.symbol + ': ' + item.name;
    container.appendChild(div);
  });
}

/**
 * Render a D3 treemap in #treemap with the given data.
 * @param {Array<{ name: string, value: number }>} data - Array of objects with name and value.
 * Example: [{ name: 'A', value: 100 }, ...]
 */
window.renderTreemap = function(data) {
  const container = document.getElementById('treemap');
  if (!container) return;
  container.innerHTML = '';
  if (!Array.isArray(data) || data.length === 0) return;
  // Support d3 in both browser and Jest (Node)
  let d3local;
  if (typeof d3 !== 'undefined') {
    d3local = d3;
  } else {
    try {
      d3local = require('d3');
    } catch (e) {
      throw new Error('d3 not found');
    }
  }
  const width = container.clientWidth || 600;
  const height = 400;
  const svg = d3local.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  const root = d3local.hierarchy({ children: data })
    .sum(d => d.value);
  d3local.treemap()
    .size([width, height])
    .padding(2)(root);
  const nodes = svg.selectAll('g')
    .data(root.leaves())
    .enter().append('g')
    .attr('transform', d => `translate(${d.x0},${d.y0})`);
  nodes.append('rect')
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', '#34D399');
  nodes.append('text')
    .attr('x', 4)
    .attr('y', 18)
    .text(d => d.data.name)
    .attr('fill', '#222')
    .attr('font-size', '16px');
};

// --- Integration: API data to D3 Treemap (F9.2) ---
/**
 * Takes API data array and maps to D3 treemap format [{ name, value }]
 * @param {Array} apiData - Array of stock objects from API
 * @returns {Array<{ name: string, value: number }>}
 */
function mapApiDataToTreemap(apiData) {
  if (!Array.isArray(apiData)) return [];
  return apiData.map(item => ({
    name: item.symbol || item.name || '',
    value: typeof item.change === 'number' ? Math.abs(item.change) : 1 // fallback for demo
  }));
}

// Update DOMContentLoaded handler to render treemap with real API data
window.addEventListener('DOMContentLoaded', () => {
  setupDatePicker();
  window.renderDropdownFilters({
    indices: window.defaultIndices,
    sectors: window.defaultSectors,
    onChange: params => {
      const index = document.getElementById('index-dropdown').value;
      const sector = document.getElementById('sector-dropdown').value;
      window.loadHeatmapData({ index, sector })
        .then(data => {
          // If API returns { data: [...] }, unwrap
          const arr = Array.isArray(data) ? data : data.data;
          window.renderTreemap(mapApiDataToTreemap(arr));
        });
    }
  });
  // Initial load
  const index = window.defaultIndices[0];
  const sector = window.defaultSectors[0];
  window.loadHeatmapData({ index, sector })
    .then(data => {
      const arr = Array.isArray(data) ? data : data.data;
      window.renderTreemap(mapApiDataToTreemap(arr));
    });
  const btn = document.getElementById('test-load-btn');
  if (btn) {
    btn.addEventListener('click', () => window.loadHeatmapData()
      .then(data => {
        const arr = Array.isArray(data) ? data : data.data;
        window.renderTreemap(mapApiDataToTreemap(arr));
      }));
  }
});

// Export for Jest tests (CommonJS compatibility)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setupDatePicker,
    getDatePickerValue,
    fetchHeatmapData,
    showLoadingSpinner,
    hideLoadingSpinner,
    showErrorMessage,
    hideErrorMessage,
    renderDropdownFilters,
    debounce,
    renderTreemap,
    mapApiDataToTreemap // export for test
  };
}
