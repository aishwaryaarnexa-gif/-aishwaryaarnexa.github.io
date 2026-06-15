/* ============================================================
   VILLAS PAGE JAVASCRIPT
   ============================================================ */

function filterVillas(category) {
  const cards = document.querySelectorAll('[id^="vc-"]');
  const buttons = document.querySelectorAll('.filter-btn');
  const noResults = document.getElementById('no-results-v');

  buttons.forEach(b => b.classList.remove('active'));
  event?.target?.classList.add('active');

  let count = 0;
  cards.forEach(card => {
    const cats = card.dataset.category || '';
    const show = category === 'all' || cats.includes(category);
    card.classList.toggle('hidden', !show);
    if (show) count++;
  });

  if (noResults) noResults.style.display = count === 0 ? 'block' : 'none';
}

function filterByGuests(max) {
  const cards = document.querySelectorAll('[id^="vc-"]');
  const noResults = document.getElementById('no-results-v');
  let count = 0;

  cards.forEach(card => {
    if (max === 'any') { card.classList.remove('hidden'); count++; return; }
    const guests = parseInt(card.dataset.guests || '99');
    const show = guests <= parseInt(max);
    card.classList.toggle('hidden', !show);
    if (show) count++;
  });

  if (noResults) noResults.style.display = count === 0 ? 'block' : 'none';
}
