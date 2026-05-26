function getDetail() {
  const productDetail = document.getElementById('productDetail');
  const params = new URLSearchParams(location.search);
  const productID = params.get('id');

  if (!productID) {
    productDetail.textContent = 'ID Tidak Ditemukan!';
    return;
  }

  fetch('./assets/data.json')
    .then(r => r.json())
    .then(data => {
      const item = data.find(row => row.id === productID);
      if (!item) {
        productDetail.textContent = 'Produk Tidak Ditemukan!';
        return;
      }

      productDetail.innerHTML = `
        <a href="index.html" class="back">Kembali ke Koleksi</a>

        <div class="detail-hero" style="background-image: url('${item.image}')"></div>

        <div class="detail-card">
          <div class="detail-header">
            <div class="detail-tag">Audio Gear</div>
            <h1 class="detail-title">${item.title}</h1>
            <p class="detail-subtitle">${item.subtitle}</p>
          </div>

          <div class="detail-stats">
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
          </div>

          <div class="detail-description" id="detailBody"></div>

          <div class="detail-price-block">
            <div>
              <div class="price-label">Harga</div>
              <div class="price-value">${item.price}</div>
            </div>
          </div>
        </div>
      `;

      const detailBody = document.getElementById('detailBody');
      const paragraphs = (item.detail_description || '').split(/\n+/);
      paragraphs.forEach(text => {
        const trimmed = text.trim();
        if (!trimmed) return;
        const p = document.createElement('p');
        p.textContent = trimmed;
        detailBody.appendChild(p);
      });
    });
}

getDetail();
