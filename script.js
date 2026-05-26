/* Custom cursor */
const cursor = document.createElement('div');
cursor.id = 'cursor';
document.body.appendChild(cursor);

let mx = window.innerWidth/2, my = window.innerHeight/2;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

document.querySelectorAll('a, button, [class*="content"], [class*="cta"]').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

/* Hero noise layer */
const hero = document.querySelector('.hero');
if (hero) {
  const noise = document.createElement('div');
  noise.className = 'hero-noise';
  hero.appendChild(noise);

  const badge = document.createElement('div');
  badge.className = 'hero-badge';
  badge.textContent = 'AUDIO FATHBOY';
  hero.appendChild(badge);

  const counter = document.createElement('div');
  counter.className = 'hero-counter';
  counter.textContent = '001 / COLLECTION';
  hero.appendChild(counter);

  const scrollHint = document.createElement('div');
  scrollHint.className = 'hero-scroll';
  scrollHint.textContent = 'Scroll';
  hero.appendChild(scrollHint);

  const content = hero.querySelector('.hero-text');
  if (content) {
    content.className = 'hero-content';
    const h1 = content.querySelector('h1');
    const p = content.querySelector('p');

    const eyebrow = document.createElement('div');
    eyebrow.className = 'hero-eyebrow';
    eyebrow.textContent = 'New Collection · 2025';
    content.insertBefore(eyebrow, h1);

    if (h1) {
      const words = h1.textContent.trim().split(' ');
      h1.className = 'hero-title';
      if (words.length >= 2) {
        h1.innerHTML = `${words[0]} <span>${words.slice(1).join(' ')}</span>`;
      }
    }
    if (p) { p.className = 'hero-sub'; }
  }
}

/* Product list */
function getData() {
  fetch('./assets/data.json')
    .then(r => r.json())
    .then(items => {
      const productList = document.getElementById('productList');
      const cards = [];

      items.forEach((item, i) => {
        const card = document.createElement('div');
        const productUrl = `detail.html?id=${encodeURIComponent(item.id)}`;
        card.className = 'product';
        card.style.backgroundImage = `url(${item.image})`;

        card.innerHTML = `
          <div class="product-index">${String(i + 2).padStart(2, '0')}</div>
          <div class="product-content">
            <div class="product-tag">Audio Gear</div>
            <h1 class="title">${item.title}</h1>
            <p class="subtitle">${item.subtitle}</p>
            <div class="product-divider"></div>
            <div class="product-stats">
              <div class="stat">
                <span class="label">Warna</span>
                <span class="value">${item.color}</span>
              </div>
              <div class="stat">
                <span class="label">Baterai</span>
                <span class="value">${item.battery}</span>
              </div>
              <div class="stat">
                <span class="label">Bobot</span>
                <span class="value">${item.weight}</span>
              </div>
              <div class="stat">
                <span class="label">Latency</span>
                <span class="value">${item.latency}</span>
              </div>
              <div class="stat">
                <span class="label">Harga</span>
                <span class="value">${item.price}</span>
              </div>
            </div>
            <div class="product-cta">Lihat Detail</div>
          </div>
        `;

        const content = card.querySelector('.product-content');
        if (content) {
          content.addEventListener('mouseenter', () => cursor && cursor.classList.add('big'));
          content.addEventListener('mouseleave', () => cursor && cursor.classList.remove('big'));
          content.onclick = () => window.location.href = productUrl;
        }

        productList.appendChild(card);
        cards.push(card);
      });

      function reveal() {
        cards.forEach(card => {
          const { top, bottom } = card.getBoundingClientRect();
          if (top < window.innerHeight * 0.88 && bottom > window.innerHeight * 0.12) {
            card.classList.add('show');
          }
        });
      }

      reveal();
      window.addEventListener('scroll', reveal, { passive: true });
      window.addEventListener('resize', reveal);
    });
}

getData();
