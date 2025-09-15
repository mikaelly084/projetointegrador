const input = document.getElementById('q');
const filter = document.getElementById('filter');
const list = document.getElementById('list');

function matchesText(card, term) {
  if (!term) return true;
  return card.innerText.toLowerCase().includes(term.toLowerCase());
}

function matchesFilter(card, value) {
  if (value === 'all') return true;
  const label = card.querySelector('.stars')?.getAttribute('aria-label') || "";
  return label.includes(value);
}

function applyFilters() {
  const term = input.value.trim();
  const fv = filter.value;
  const cards = Array.from(list.querySelectorAll('.card'));
  cards.forEach(c => {
    c.style.display = (matchesText(c, term) && matchesFilter(c, fv)) ? '' : 'none';
  });
}

input.addEventListener('input', applyFilters);
filter.addEventListener('change', applyFilters);
