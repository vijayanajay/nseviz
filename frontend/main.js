// --- API base URL logic for dev/prod ---
const API_BASE = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && window.location.port === "3000"
  ? "http://localhost:8080"
  : "";

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
  const url = API_BASE + '/api/heatmap-data?' + q.toString();
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

// --- Color coding for price change % (F9.3) ---
// Returns hex color string per frontend-design.md palette
function getColorForChange(change) {
  if (typeof change !== 'number' || isNaN(change)) return '#F5F7FA'; // fallback neutral
  if (change < -3) return '#E02424'; // Deep Red
  if (change >= -3 && change < -1) return '#EF4444'; // Mid Red
  if (change >= -1 && change < 0) return '#F87171'; // Light Red
  if (change >= 0 && change < 1) return '#34D399'; // Light Green
  if (change >= 1 && change < 3) return '#10B981'; // Mid Green
  if (change >= 3) return '#059669'; // Deep Green
  return '#F5F7FA';
}

// --- Sizing logic for market cap (F9.3) ---
// Returns a value suitable for D3 treemap sizing
function getSizeForMarketCap(marketCap) {
  if (typeof marketCap !== 'number' || marketCap <= 0) return 0;
  // Use log scale for better visual spread
  return Math.log10(marketCap);
}

// Ensure d3 is available for Node (Jest) tests
let d3;
if (typeof window === 'undefined') {
  try {
    d3 = require('d3');
  } catch (e) {
    // fallback: handled in renderTreemap
  }
}

/**
 * Render a D3 treemap in #treemap with the given data.
 * @param {Array<{ name: string, value: number, change: number, symbol: string, sector: string }>} data - Array of objects with name, value, change, symbol and sector.
 * Example: [{ name: 'A', value: 100, change: 0.5, symbol: 'A', sector: 'FINANCE' }, ...]
 */
window.renderTreemap = function(data) {
  const container = document.getElementById('treemap');
  if (!container) return;
  container.innerHTML = '';
  if (!Array.isArray(data) || data.length === 0) return;
  // Support d3 in both browser and Jest (Node)
  let d3local;
  if (typeof window === 'undefined') {
    d3local = d3; // Always use imported d3 in Node/Jest
  } else if (typeof window !== 'undefined' && typeof window.d3 !== 'undefined') {
    d3local = window.d3;
  } else {
    throw new Error('d3 not found');
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
    .attr('fill', d => getColorForChange(d.data.change)) // Use color logic
    .attr('data-symbol', d => d.data.symbol || d.data.name)
    .attr('data-sector', d => d.data.sector || '') // Add sector data attribute
    .on('mouseover', function(event, d) {
      if (window.innerWidth <= 600) return; // Only tooltip on desktop
      removeTreemapTooltip();
      showTreemapTooltip(d.data, event);
    })
    .on('mouseout', function(event, d) {
      if (window.innerWidth <= 600) return;
      removeTreemapTooltip();
    })
    .on('click', function(event, d) {
      if (window.innerWidth > 600 && d.data.sector) {
        // Desktop: trigger sector drilldown when sector exists
        window.handleSectorClick(event, d.data);
      } else if (window.innerWidth <= 600) {
        // Mobile: show modal
        removeTreemapModal();
        showTreemapModal(d.data);
      }
    });
  nodes.append('text')
    .attr('x', 4)
    .attr('y', 14)
    .text(d => d.data.symbol || d.data.name)
    .attr('font-size', '10px')
    .attr('fill', '#fff')
    .style('pointer-events', 'none');
};

// --- F9.5: Sector Drilldown ---
/**
 * Handle click on sector in treemap to filter by that sector
 * @param {Event} event - The click event
 * @param {Object} data - The data object for the clicked element
 */
window.handleSectorClick = function(event, data) {
  if (event) event.preventDefault();
  if (!data || !data.sector) return;
  
  // Get current parameters
  const params = {};
  const indexDropdown = document.getElementById('index-dropdown');
  if (indexDropdown) params.index = indexDropdown.value;
  
  // Add sector to parameters
  params.sector = data.sector;
  
  // Update sector dropdown if it exists
  const sectorDropdown = document.getElementById('sector-dropdown');
  if (sectorDropdown) sectorDropdown.value = data.sector;
  
  // Reload data with new parameters
  return window.loadHeatmapData(params)
    .then(apiData => {
      const treemapData = mapApiDataToTreemap(apiData);
      renderTreemap(treemapData);
      return apiData;
    });
};

// --- Tooltip/Modal helpers for Treemap (F9.4) ---
function getTreemapTooltipHTML(data) {
  return `
    <div style='font-weight:700;font-size:1.1em;'>${data.name}</div>
    <div style='margin:6px 0 2px 0;font-size:0.97em;'>Price Change: <b>${formatChange(data.change)}</b></div>
    <div>Current Price: ₹${data.price ?? '--'}</div>
    <div>Volume: ${formatVolume(data.volume)}</div>
    <div>P/E Ratio: ${data.pe ?? '--'}</div>
    <div>Market Cap: ₹${formatMarketCap(data.marketCap ?? data.market_cap)}</div>
  `;
}
function getTreemapModalHTML(data) {
  return `
    <div style='font-weight:700;font-size:1.1em;'>${data.name}</div>
    <div style='margin:6px 0 2px 0;font-size:0.97em;'>Price Change: <b>${formatChange(data.change)}</b></div>
    <div>Current Price: ₹${data.price ?? '--'}</div>
    <div>Volume: ${formatVolume(data.volume)}</div>
    <div>P/E Ratio: ${data.pe ?? '--'}</div>
    <div>Market Cap: ₹${formatMarketCap(data.marketCap ?? data.market_cap)}</div>
    <div style='margin-top:16px;text-align:center;'><button style='padding:8px 24px;border-radius:8px;background:#2563EB;color:#fff;border:none;font-weight:600;font-size:1em;'>Close</button></div>
  `;
}
function showTreemapTooltip(data, event) {
  removeTreemapTooltip();
  const tooltip = document.createElement('div');
  tooltip.className = 'treemap-tooltip';
  tooltip.style.position = 'fixed';
  tooltip.style.left = (event.clientX + 18) + 'px';
  tooltip.style.top = (event.clientY - 18) + 'px';
  tooltip.style.maxWidth = '280px';
  tooltip.style.background = '#fff';
  tooltip.style.borderRadius = '8px';
  tooltip.style.border = '1px solid rgba(0,0,0,0.1)';
  tooltip.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
  tooltip.style.padding = '16px';
  tooltip.style.zIndex = 9999;
  tooltip.innerHTML = getTreemapTooltipHTML(data);
  document.body.appendChild(tooltip);
}
function showTreemapModal(data) {
  removeTreemapModal();
  const modal = document.createElement('div');
  modal.className = 'treemap-modal';
  modal.style.position = 'fixed';
  modal.style.left = 0;
  modal.style.right = 0;
  modal.style.bottom = 0;
  modal.style.background = '#fff';
  modal.style.borderRadius = '18px 18px 0 0';
  modal.style.boxShadow = '0 -2px 16px 0 #0f14191a';
  modal.style.padding = '24px 20px 32px 20px';
  modal.style.zIndex = 9999;
  modal.style.maxWidth = '98vw';
  modal.innerHTML = getTreemapModalHTML(data);
  modal.addEventListener('click', removeTreemapModal);
  document.body.appendChild(modal);
}
function removeTreemapTooltip() {
  const el = document.querySelector('.treemap-tooltip');
  if (el) el.remove();
}
function removeTreemapModal() {
  const el = document.querySelector('.treemap-modal');
  if (el) el.remove();
}
function formatChange(change) {
  if (typeof change !== 'number') return '--';
  const sign = change > 0 ? '+' : '';
  return sign + change.toFixed(2) + '%';
}
function formatVolume(vol) {
  if (!vol || isNaN(vol)) return '--';
  if (vol > 1e7) return (vol / 1e6).toFixed(1) + ' M';
  if (vol > 1e4) return (vol / 1e3).toFixed(1) + ' K';
  return vol.toLocaleString();
}
function formatMarketCap(cap) {
  if (!cap || isNaN(cap)) return '--';
  if (cap >= 1e12) return (cap / 1e12).toFixed(2) + ' T';
  if (cap >= 1e9) return (cap / 1e9).toFixed(2) + ' B';
  if (cap >= 1e6) return (cap / 1e6).toFixed(2) + ' M';
  return cap.toLocaleString();
}

// --- Integration: API data to D3 Treemap (F9.2) ---
/**
 * Takes API data array and maps to D3 treemap format [{ name, value, change, symbol, sector }]
 * @param {Array} apiData - Array of stock objects from API
 * @returns {Array<{ name: string, value: number, change: number, symbol: string, sector: string }>}
 */
function mapApiDataToTreemap(apiData) {
  if (!Array.isArray(apiData)) return [];
  return apiData.map(item => ({
    name: item.name,
    symbol: item.symbol,
    value: getSizeForMarketCap(item.market_cap || item.marketCap),
    change: item.change,
    sector: item.sector
  })).filter(d => d.value > 0);
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
    mapApiDataToTreemap,
    getColorForChange,
    getSizeForMarketCap,
    showTreemapTooltip,
    removeTreemapTooltip,
    showTreemapModal,
    removeTreemapModal,
    formatChange,
    formatVolume,
    formatMarketCap,
    getTreemapTooltipHTML,
    getTreemapModalHTML,
    handleSectorClick
  };
}
