import './style.css';

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.classList.toggle('open');
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
);

for (const el of document.querySelectorAll('.reveal')) {
  observer.observe(el);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuBtn.classList.remove('open');
    }
  });
});

async function fetchProducts() {
  try {
    const response = await fetch(new URL('./products.json', import.meta.url));
    return await response.json();
  } catch (error) {
    console.error('Neuspešno učitavanje proizvoda', error);
    return { categories: [] };
  }
}

function iconMarkup(type) {
  const icons = {
    paper: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="14" y="10" width="20" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path d="M17 18h14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M17 24h14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    binder: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M16 14h18v20H16z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M20 14v20" stroke="currentColor" stroke-width="3"/><path d="M26 14v20" stroke="currentColor" stroke-width="3"/></svg>',
    boxes: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 14h20v18H14z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M18 18h12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="22" cy="30" r="3" fill="currentColor"/></svg>',
    pen: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 32l8 8 18-18-8-8z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M28 16l4 4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    clip: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 14l12 20a6 6 0 1 1-10 4L16 26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    tape: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 20h20v12H14z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="26" r="4" fill="none" stroke="currentColor" stroke-width="3"/></svg>',
    label: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 16h20l6 8-6 8H14z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="24" r="3" fill="currentColor"/></svg>',
    cartridge: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="14" y="14" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path d="M18 18h12" stroke="currentColor" stroke-width="3"/></svg>',
    usb: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M20 14v10" fill="none" stroke="currentColor" stroke-width="3"/><path d="M20 24h8v6h-8z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M24 14v-4" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="30" r="2" fill="currentColor"/></svg>',
    default: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" stroke-width="3"/></svg>'
  };
  return icons[type] || icons.default;
}

function createCategoryCard(category, options = {}) {
  const showIcon = !options.noIcons;
  const showDescription = options.hideDescription !== true && !options.noIcons;
  return `
    <a class="category-card ${options.listView ? 'list-view' : ''}" href="category.html?cat=${encodeURIComponent(category.name)}">
      ${showIcon ? `<div class="icon-box icon-${category.icon}">${iconMarkup(category.icon)}</div>` : ''}
      <div class="category-body">
        <h3>${category.name}</h3>
        ${showDescription ? `<p>${category.description}</p>` : ''}
      </div>
      ${options.noIcons ? '' : `<span class="category-link">Prikaži proizvode</span>`}
    </a>
  `;
}

function createProductCard(product) {
  const imageUrl = product.image || '/src/images/papir.jpg';
  return `
    <article class="product-card">
      <div class="product-card-image">
        <img src="${imageUrl}" alt="${product.name}" />
      </div>
      <div>
        <h4>${product.name}</h4>
        <p class="product-note">Kontaktirajte nas za porudžbinu.</p>
      </div>
      <div class="product-card-meta">
        <a class="product-chip" href="tel:+381601234567" aria-label="Pozovite nas" title="Pozovite nas">
          <svg class="chip-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 006.59 6.59l1.54-1.54a1 1 0 011.06-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C9.28 22 2.5 15.22 2.5 7a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.06l-1.71 1.71z"/></svg>
        </a>
        <a class="product-chip" href="mailto:office@imperiumoffice.rs" aria-label="Pošaljite mejl" title="Pošaljite mejl">
          <svg class="chip-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm2 .5l7 4.5 7-4.5v-.5H5v.5zm14 2.39l-7 4.5-7-4.5V18h14V8.89z"/></svg>
        </a>
      </div>
    </article>
  `;
}

function createLoadMoreButton(count) {
  return `<button class="btn outline load-more-btn">Prikaži sve</button>`;
}

function bindLoadMore(buttonContainer, hiddenItems, container, options) {
  if (!buttonContainer) return;
  if (!hiddenItems.length) {
    buttonContainer.innerHTML = '';
    return;
  }

  buttonContainer.innerHTML = createLoadMoreButton(hiddenItems.length);
  const action = buttonContainer.querySelector('.load-more-btn');
  action.addEventListener('click', () => {
    hiddenItems.forEach((category) => {
      container.insertAdjacentHTML('beforeend', createCategoryCard(category, options));
    });
    buttonContainer.innerHTML = '';
  });
}

async function renderHomepagePreview() {
  const homeGrid = document.querySelector('.homepage-category-list');
  const homeAction = document.querySelector('.homepage-catalog-action');
  if (!homeGrid || !homeAction) return;

  const data = await fetchProducts();
  const visibleCategories = data.categories.slice(0, 5);

  homeGrid.innerHTML = visibleCategories
    .map((category) => createCategoryCard(category, { noIcons: true, hideDescription: true, listView: true }))
    .join('');

  homeAction.innerHTML = `<a class="btn outline" href="catalog.html">Pogledaj sve kategorije</a>`;
}

async function renderCatalogPage() {
  const categoryContainer = document.querySelector('.category-list');
  if (!categoryContainer) return;

  const data = await fetchProducts();
  const visibleCategories = data.categories.slice(0, 5);
  const hiddenCategories = data.categories.slice(5);

  categoryContainer.innerHTML = visibleCategories
    .map((category) => createCategoryCard(category, { noIcons: true, hideDescription: true, listView: true }))
    .join('');

  bindLoadMore(
    document.querySelector('.catalog-action'),
    hiddenCategories,
    categoryContainer,
    { noIcons: true, hideDescription: true }
  );
}

async function renderCategoryPage() {
  const productContainer = document.querySelector('.category-products');
  const title = document.querySelector('.category-title');
  const subtitle = document.querySelector('.category-subtitle');
  if (!productContainer || !title || !subtitle) return;

  const params = new URLSearchParams(window.location.search);
  const selected = params.get('cat');
  const data = await fetchProducts();
  const category = data.categories.find(
    (item) => item.name.toLowerCase() === String(selected).toLowerCase() || item.slug === String(selected).toLowerCase()
  );

  if (!category) {
    title.textContent = 'Kategorija nije pronađena';
    subtitle.textContent = 'Molimo izaberite ispravnu kategoriju iz kataloga.';
    productContainer.innerHTML = '<p class="empty-state">Nema proizvoda za ovu kategoriju.</p>';
    return;
  }

  title.textContent = category.name;
  subtitle.textContent = 'Prikaz proizvoda iz odabrane kategorije.';
  productContainer.innerHTML = category.products.map(createProductCard).join('');
}

renderHomepagePreview();
renderCatalogPage();
renderCategoryPage();
