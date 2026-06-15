/* ============================================================
   TREKS PAGE JAVASCRIPT
   ============================================================ */

function filterTreks(category) {
  const cards = document.querySelectorAll('[id^="tcard-"]');
  const buttons = document.querySelectorAll('.filter-btn');
  const noResults = document.getElementById('no-results');

  buttons.forEach(b => b.classList.remove('active'));
  event?.target?.classList.add('active');

  let visibleCount = 0;
  cards.forEach(card => {
    const cats = card.dataset.category || '';
    const diff = card.dataset.difficulty || '';
    const show = category === 'all' ||
                 cats.includes(category) ||
                 diff === category;
    card.classList.toggle('hidden', !show);
    if (show) visibleCount++;
  });

  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

function sortTreks(method) {
  const grid = document.getElementById('treks-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('[id^="tcard-"]')];

  cards.sort((a, b) => {
    if (method === 'price-low') return parseInt(a.dataset.price) - parseInt(b.dataset.price);
    if (method === 'price-high') return parseInt(b.dataset.price) - parseInt(a.dataset.price);
    if (method === 'duration')  return parseInt(a.dataset.days) - parseInt(b.dataset.days);
    if (method === 'rating')    return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
    return 0; // popular = original order
  });

  cards.forEach(c => grid.appendChild(c));
  showToast(`Sorted by: ${method.replace('-', ' ')}`, 'info');
}
