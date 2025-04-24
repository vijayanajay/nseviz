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
