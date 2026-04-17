/**
 * app.js
 * ──────────────────────────────────────────────
 * Sky Journey Today — メインロジック
 * 依存: content.js (window.SKY_CONTENT, getShuffledContent, SCROLL_QUOTES)
 * ──────────────────────────────────────────────
 */

'use strict';

// =====================
// CONFIG
// =====================
const CONFIG = {
  // Unsplash Access Key（本番では自分のキーに差し替えてください）
  // 取得先: https://unsplash.com/developers
  ACCESS_KEY: '8ZXTrab0MBeAvdoQ3GQNtI3_2h6MsOFtH_a_79hgQUQ',

  SLIDE_COUNT: 5,

  // ブルーアワーをメインに据えたクエリ群
  QUERIES: [
    'blue hour sky cityscape',
    'twilight sky gradient purple blue',
    'blue hour long exposure city',
    'dusk sky moody blue purple',
    'dawn sky soft light horizon',
    'sunset sky orange purple gradient',
    'night blue sky horizon minimal',
    'blue hour reflection water',
    'twilight city lights blue',
    'golden hour sky pastel',
  ],
};

// =====================
// STATE
// =====================
const State = {
  slides: [],
  currentSlide: 0,
  favorites: JSON.parse(localStorage.getItem('skyFavorites') || '[]'),
  isAnimating: false,
};

// =====================
// INIT
// =====================
async function init() {
  setupNavigation();
  setupLightbox();
  setupRefreshButton();
  renderScrollQuotes();   // ← 内部でinitQuoteObserverも呼ぶ
  registerServiceWorker();

  renderSliderSkeletons(CONFIG.SLIDE_COUNT);
  const photos = await fetchPhotos(CONFIG.SLIDE_COUNT);
  renderSlides(photos);
  initSwipe();
}

// =====================
// NAVIGATION
// =====================
function setupNavigation() {
  document.getElementById('logoLink')
    .addEventListener('click', e => { e.preventDefault(); showPage('main'); });
  document.getElementById('navFavorites')
    .addEventListener('click', e => { e.preventDefault(); showPage('favorites'); });
  document.getElementById('navAbout')
    .addEventListener('click', e => { e.preventDefault(); showPage('about'); });
}

function showPage(name) {
  ['main', 'favorites', 'about'].forEach(p => {
    document.getElementById(`page-${p}`).style.display = 'none';
  });

  const el = document.getElementById(`page-${name}`);
  el.style.display = 'block';
  el.classList.remove('page-fade');
  void el.offsetHeight; // reflow for re-trigger
  el.classList.add('page-fade');

  if (name === 'favorites') renderFavorites();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================
// FETCH PHOTOS
// =====================
async function fetchPhotos(count) {
  const queries = shuffleArr([...CONFIG.QUERIES]).slice(0, count);
  const results = [];

  for (let i = 0; i < count; i++) {
    const query = queries[i] || CONFIG.QUERIES[i % CONFIG.QUERIES.length];
    try {
      const res = await fetch(
        `https://api.unsplash.com/photos/random` +
        `?query=${encodeURIComponent(query)}` +
        `&orientation=landscape` +
        `&content_filter=high` +
        `&client_id=${CONFIG.ACCESS_KEY}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      results.push({
        id:           data.id,
        url:          data.urls.regular + '&w=1400&q=85',
        full:         data.urls.full,
        thumb:        data.urls.small,
        photographer: data.user.name,
        profileUrl:   `${data.user.links.html}?utm_source=sky_journey&utm_medium=referral`,
        unsplashUrl:  `${data.links.html}?utm_source=sky_journey&utm_medium=referral`,
        alt:          data.alt_description || 'sky',
      });
    } catch (err) {
      console.warn(`[SkyJourney] fetch failed for query "${query}":`, err);
    }
  }

  return results;
}

// =====================
// SKELETON LOADER
// =====================
function renderSliderSkeletons(count) {
  const track  = document.getElementById('sliderTrack');
  const dotsEl = document.getElementById('dots');
  track.innerHTML  = '';
  dotsEl.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
      <div class="slide-inner">
        <div class="photo-frame skeleton" style="aspect-ratio:3/2;"></div>
        <div class="caption-area">
          <div class="skeleton" style="height:0.7em;width:30%;border-radius:2px;"></div>
        </div>
      </div>`;
    track.appendChild(slide);
    appendDot(dotsEl, i, false);
  }
}

// =====================
// RENDER SLIDES
// =====================
function renderSlides(photos) {
  if (!photos.length) {
    showToast('could not load images');
    return;
  }

  State.slides = photos;
  State.currentSlide = 0;

  const track  = document.getElementById('sliderTrack');
  const dotsEl = document.getElementById('dots');
  track.innerHTML  = '';
  dotsEl.innerHTML = '';

  const dateStr = formatDate(new Date());

  photos.forEach((photo, i) => {
    const isFav = State.favorites.some(f => f.id === photo.id);

    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = buildSlideHTML(photo, i, isFav, dateStr);
    track.appendChild(slide);

    const img = slide.querySelector('img');
    img.addEventListener('load', () => img.classList.add('loaded'));
    if (img.complete) img.classList.add('loaded');

    appendDot(dotsEl, i, i === 0);
  });

  updateSliderPosition(false);
}

function buildSlideHTML(photo, index, isFav, dateStr) {
  return `
    <div class="slide-inner">
      <div class="photo-frame" id="frame-${index}">
        <img
          src="${photo.url}"
          alt="${photo.alt}"
          loading="${index === 0 ? 'eager' : 'lazy'}"
          id="img-${index}"
        >
        <div class="date-badge">${dateStr}</div>
        <button
          class="fav-btn ${isFav ? 'active' : ''}"
          id="fav-${index}"
          title="お気に入りに追加"
          onclick="toggleFav(${index})"
        >${isFav ? '❤️' : '🤍'}</button>
        <button
          class="expand-btn"
          title="拡大表示"
          onclick="openLightbox(${index})"
        >⤢</button>
      </div>
      <div class="caption-area">
        <p class="credit-line">
          Photo by
          <a href="${photo.profileUrl}" target="_blank" rel="noopener">${photo.photographer}</a>
          &nbsp;/&nbsp;
          <a href="${photo.unsplashUrl}" target="_blank" rel="noopener">Unsplash</a>
        </p>
      </div>
    </div>`;
}

function appendDot(container, index, isActive) {
  const dot = document.createElement('button');
  dot.className = `dot${isActive ? ' active' : ''}`;
  dot.setAttribute('aria-label', `slide ${index + 1}`);
  dot.addEventListener('click', () => goToSlide(index));
  container.appendChild(dot);
}

// =====================
// SLIDER NAVIGATION
// =====================
function goToSlide(index) {
  if (State.isAnimating) return;
  const len = State.slides.length;
  State.currentSlide = ((index % len) + len) % len; // wrap around
  updateSliderPosition(true);
  updateDots();
}

function updateSliderPosition(animate) {
  const track = document.getElementById('sliderTrack');
  track.style.transition = animate
    ? 'transform 0.75s cubic-bezier(0.4,0,0.2,1)'
    : 'none';
  track.style.transform = `translateX(-${State.currentSlide * 100}%)`;
  if (!animate) void track.offsetHeight; // force reflow
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === State.currentSlide);
  });
}

document.getElementById('prevBtn').addEventListener('click', () => {
  goToSlide(State.currentSlide - 1);
});
document.getElementById('nextBtn').addEventListener('click', () => {
  goToSlide(State.currentSlide + 1);
});

// =====================
// SWIPE / DRAG
// =====================
function initSwipe() {
  const wrapper = document.getElementById('sliderWrapper');

  // Touch
  let touchStartX = 0, touchStartY = 0;
  wrapper.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  wrapper.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      goToSlide(State.currentSlide + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });

  // Mouse drag
  let mouseStartX = 0, mouseIsDown = false;
  wrapper.addEventListener('mousedown', e => {
    mouseStartX  = e.clientX;
    mouseIsDown  = true;
  });
  wrapper.addEventListener('mousemove', e => {
    if (mouseIsDown) e.preventDefault();
  });
  wrapper.addEventListener('mouseup', e => {
    if (!mouseIsDown) return;
    const dx = e.clientX - mouseStartX;
    if (Math.abs(dx) > 40) goToSlide(State.currentSlide + (dx < 0 ? 1 : -1));
    mouseIsDown = false;
  });
  wrapper.addEventListener('mouseleave', () => { mouseIsDown = false; });
}

// =====================
// FAVORITES
// =====================
function toggleFav(index) {
  const photo = State.slides[index];
  if (!photo) return;

  const existingIndex = State.favorites.findIndex(f => f.id === photo.id);
  const btn = document.getElementById(`fav-${index}`);

  if (existingIndex >= 0) {
    State.favorites.splice(existingIndex, 1);
    btn.textContent = '🤍';
    btn.classList.remove('active');
    showToast('removed from favorites');
  } else {
    State.favorites.push(photo);
    btn.textContent = '❤️';
    btn.classList.add('active');
    showToast('saved to favorites ✈');
  }

  localStorage.setItem('skyFavorites', JSON.stringify(State.favorites));
}

function renderFavorites() {
  const grid = document.getElementById('favGrid');

  if (!State.favorites.length) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <p>まだ空を保存していません。<br>気に入った空に ♡ を。</p>
      </div>`;
    return;
  }

  grid.innerHTML = State.favorites
    .map((photo, i) => `
      <div class="fav-item" onclick="openLightboxUrl('${photo.url}')">
        <img src="${photo.thumb}" alt="${photo.alt}" loading="lazy">
        <div class="fav-item-overlay">
          <button class="fav-del-btn" onclick="deleteFav(event,${i})">remove</button>
        </div>
      </div>`)
    .join('');
}

function deleteFav(event, index) {
  event.stopPropagation();
  State.favorites.splice(index, 1);
  localStorage.setItem('skyFavorites', JSON.stringify(State.favorites));
  renderFavorites();
  showToast('removed');
}

// =====================
// LIGHTBOX
// =====================
function openLightbox(index) {
  const photo = State.slides[index];
  if (!photo) return;
  openLightboxUrl(photo.url);
}

function openLightboxUrl(url) {
  document.getElementById('lightboxImg').src = url;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function setupLightbox() {
  document.getElementById('lightbox')
    .addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });
  document.getElementById('lightboxClose')
    .addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// =====================
// REFRESH BUTTON
// =====================
function setupRefreshButton() {
  document.getElementById('refreshBtn').addEventListener('click', async () => {
    const btn = document.getElementById('refreshBtn');
    btn.disabled = true;
    btn.textContent = '...';

    renderSliderSkeletons(CONFIG.SLIDE_COUNT);
    const photos = await fetchPhotos(CONFIG.SLIDE_COUNT);
    renderSlides(photos);
    initSwipe();

    btn.disabled = false;
    btn.innerHTML = '↺ &nbsp; refresh sky';
  });
}

// =====================
// SCROLL QUOTES (下部セクション)
// =====================
function renderScrollQuotes() {
  const section = document.getElementById('quotesSection');
  if (!section) return;

  section.innerHTML = window.SCROLL_QUOTES
    .map((q, i) => {
      const translationHTML = q.translation
        ? `<p class="translation">${q.translation}</p>`
        : '';
      return `
        <div class="quote-block">
          <span class="q-label">${q.label}</span>
          <p>${q.text.replace(/\n/g, '<br>')}</p>
          ${translationHTML}
          <cite>${q.cite}</cite>
        </div>
        ${i < window.SCROLL_QUOTES.length - 1
          ? '<div class="spacer"><div class="spacer-line"></div></div>'
          : ''}`;
    })
    .join('');

  // DOM生成直後にobserver登録
  initQuoteObserver();
}

function initQuoteObserver() {
  // threshold:0 → 1pxでも見えたら発火
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target); // 一度発火したら解除
      }
    }),
    { threshold: 0 }
  );

  document.querySelectorAll('.quote-block').forEach(el => {
    // すでにビューポート内に入っている要素は即座にvisibleにする
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
}

// =====================
// TOAST
// =====================
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// =====================
// UTILS
// =====================
function formatDate(d) {
  return d
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase();
}

function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// =====================
// PWA SERVICE WORKER
// =====================
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    const swCode = `
const CACHE_NAME = 'sky-journey-v1';
self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE_NAME))
);
self.addEventListener('fetch', e => {
  // Unsplash 画像はキャッシュしない（容量節約）
  if (e.request.url.includes('unsplash')) return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});`;
    const blob = new Blob([swCode], { type: 'application/javascript' });
    navigator.serviceWorker
      .register(URL.createObjectURL(blob))
      .catch(() => {/* SW は任意機能なのでエラーは無視 */});
  });
}

// =====================
// GLOBAL EXPOSE
// (onclick属性から呼び出すため window に公開)
// =====================
window.toggleFav       = toggleFav;
window.openLightbox    = openLightbox;
window.openLightboxUrl = openLightboxUrl;
window.deleteFav       = deleteFav;
window.showPage        = showPage;

// =====================
// START
// =====================
init();
