// ============ ДАННЫЕ ============
const DEFAULT_SPECIALISTS = [
  { id: 1, name: 'Анна Смирнова', initials: 'АС', color: '#A8D5BA', spec: 'anxiety', specName: 'Тревожность', experience: 8, price: 2500, rating: 4.9, reviews: 124,
    bio: 'Специализируюсь на работе с тревожными состояниями и паническими атаками.', education: 'МГУ им. М.В. Ломоносова, 2016', languages: 'Русский, английский', approach: 'КПТ, mindfulness',
    slots: [
      { date: '2026-10-15', time: '10:00', duration: 60, booked: false },
      { date: '2026-10-15', time: '14:00', duration: 60, booked: false },
      { date: '2026-10-16', time: '12:00', duration: 90, booked: true },
      { date: '2026-10-17', time: '16:00', duration: 60, booked: false },
    ]},
  { id: 2, name: 'Дмитрий Волков', initials: 'ДВ', color: '#B8A9D9', spec: 'depression', specName: 'Депрессия', experience: 12, price: 3500, rating: 5.0, reviews: 210,
    bio: 'Работаю с депрессивными состояниями, потерей смысла, кризисами.', education: 'СПбГУ, 2012', languages: 'Русский', approach: 'Психодинамическая терапия, ACT',
    slots: [
      { date: '2026-10-15', time: '11:00', duration: 60, booked: false },
      { date: '2026-10-16', time: '15:00', duration: 90, booked: false },
      { date: '2026-10-18', time: '10:00', duration: 60, booked: false },
    ]},
  { id: 3, name: 'Елена Кузнецова', initials: 'ЕК', color: '#F2C4A7', spec: 'relations', specName: 'Отношения', experience: 6, price: 2000, rating: 4.8, reviews: 89,
    bio: 'Помогаю парам и отдельным людям разбираться в отношениях.', education: 'РГГУ, 2018', languages: 'Русский', approach: 'Системная семейная терапия, ЭФТ',
    slots: [
      { date: '2026-10-15', time: '13:00', duration: 60, booked: false },
      { date: '2026-10-17', time: '18:00', duration: 60, booked: false },
    ]},
  { id: 4, name: 'Игорь Петров', initials: 'ИП', color: '#A8D5BA', spec: 'career', specName: 'Карьера', experience: 10, price: 3000, rating: 4.9, reviews: 156,
    bio: 'Карьерный консультант. Помогаю найти своё дело.', education: 'ВШЭ, 2014', languages: 'Русский, английский', approach: 'Коучинг, КПТ',
    slots: [
      { date: '2026-10-16', time: '11:00', duration: 60, booked: false },
      { date: '2026-10-18', time: '14:00', duration: 90, booked: false },
    ]},
  { id: 5, name: 'Мария Соколова', initials: 'МС', color: '#B8A9D9', spec: 'child', specName: 'Детская психология', experience: 7, price: 2800, rating: 5.0, reviews: 98,
    bio: 'Работаю с детьми от 4 до 16 лет и их родителями.', education: 'МПГУ, 2017', languages: 'Русский', approach: 'Игровая терапия, арт-терапия',
    slots: [
      { date: '2026-10-15', time: '16:00', duration: 60, booked: false },
      { date: '2026-10-17', time: '11:00', duration: 45, booked: false },
    ]},
  { id: 6, name: 'Ольга Новикова', initials: 'ОН', color: '#F2C4A7', spec: 'anxiety', specName: 'Тревожность', experience: 5, price: 1800, rating: 4.7, reviews: 67,
    bio: 'Помогаю справиться с тревогой, страхами и неуверенностью.', education: 'МГППУ, 2019', languages: 'Русский', approach: 'КПТ, телесно-ориентированная терапия',
    slots: [
      { date: '2026-10-16', time: '10:00', duration: 60, booked: false },
      { date: '2026-10-18', time: '17:00', duration: 60, booked: false },
    ]},
];

// ============ ХРАНИЛИЩЕ ============
function loadSpecialists() {
  const saved = localStorage.getItem('mindspace_specialists');
  if (saved) {
    try {
      const list = JSON.parse(saved);
      list.forEach(s => {
        (s.slots || []).forEach(slot => {
          if (slot.duration === undefined) slot.duration = 60;
        });
      });
      return list;
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_SPECIALISTS));
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_SPECIALISTS));
}
function saveSpecialists(list) {
  localStorage.setItem('mindspace_specialists', JSON.stringify(list));
}
let SPECIALISTS = loadSpecialists();

// ============ ИЗБРАННОЕ ============
function loadFavorites() {
  try { return JSON.parse(localStorage.getItem('mindspace_favorites') || '[]'); }
  catch (e) { return []; }
}
function saveFavorites(list) {
  localStorage.setItem('mindspace_favorites', JSON.stringify(list));
}
let FAVORITES = loadFavorites();

function toggleFavorite(id) {
  const idx = FAVORITES.indexOf(id);
  if (idx > -1) FAVORITES.splice(idx, 1);
  else FAVORITES.push(id);
  saveFavorites(FAVORITES);
  updateFavCount();
}

function updateFavCount() {
  const badge = document.getElementById('favCount');
  if (!badge) return;
  badge.textContent = FAVORITES.length;
  badge.classList.toggle('icon-btn__badge--hidden', FAVORITES.length === 0);
}

// ============ УВЕДОМЛЕНИЯ ============
function loadNotifications() {
  try { return JSON.parse(localStorage.getItem('mindspace_notifications') || '[]'); }
  catch (e) { return []; }
}
function saveNotifications(list) {
  localStorage.setItem('mindspace_notifications', JSON.stringify(list));
}
function addNotification(text) {
  const list = loadNotifications();
  list.unshift({ id: Date.now() + Math.random(), text, time: new Date().toISOString(), read: false });
  if (list.length > 50) list.length = 50;
  saveNotifications(list);
  showPushNotification('MindSpace', text);
}
function getUnreadCount() {
  return loadNotifications().filter(n => !n.read).length;
}
function markNotificationsRead() {
  const list = loadNotifications();
  list.forEach(n => n.read = true);
  saveNotifications(list);
}
function showPushNotification(title, body) {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  try { new Notification(title, { body }); } catch (e) {}
}
function requestNotificationPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') Notification.requestPermission();
}

// ============ РЕЗЕРВНЫЕ КОПИИ ============
function loadBackups() {
  try { return JSON.parse(localStorage.getItem('mindspace_backups') || '[]'); }
  catch (e) { return []; }
}
function saveBackups(list) {
  localStorage.setItem('mindspace_backups', JSON.stringify(list));
}
function createBackup() {
  const backups = loadBackups();
  const snapshot = { id: Date.now(), date: new Date().toISOString(), data: loadSpecialists(), count: SPECIALISTS.length };
  backups.unshift(snapshot);
  if (backups.length > 10) backups.length = 10;
  saveBackups(backups);
  return snapshot;
}
function restoreBackup(id) {
  const found = loadBackups().find(b => b.id === id);
  if (!found) return false;
  saveSpecialists(found.data);
  SPECIALISTS = loadSpecialists();
  return true;
}

// ============ УТИЛИТЫ ============
function formatDate(dateStr) {
  const parts = dateStr.split('-');
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  return `${Number(parts[2])} ${months[Number(parts[1]) - 1]}`;
}
function formatDuration(min) {
  min = Number(min) || 60;
  if (min < 60) return `${min} мин`;
  const h = Math.floor(min / 60), m = min % 60;
  return m === 0 ? `${h} ч` : `${h} ч ${m} мин`;
}
function formatTimeAgo(isoStr) {
  const diff = Math.floor((Date.now() - new Date(isoStr).getTime()) / 1000);
  if (diff < 60) return 'только что';
  if (diff < 3600) return `${Math.floor(diff / 60)} мин назад`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч назад`;
  return `${Math.floor(diff / 86400)} дн назад`;
}
function isFutureDate(y, m, d) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cellDate = new Date(y, m, d);
  cellDate.setHours(0, 0, 0, 0);
  return cellDate.getTime() > today.getTime();
}
function isTodayDate(y, m, d) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cellDate = new Date(y, m, d);
  cellDate.setHours(0, 0, 0, 0);
  return cellDate.getTime() === today.getTime();
}

// ============ АДМИН ============
const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'admin123';
function isAdminLogged() { return localStorage.getItem('mindspace_admin') === 'true'; }
function setAdminLogged(value) {
  if (value) localStorage.setItem('mindspace_admin', 'true');
  else localStorage.removeItem('mindspace_admin');
}

// ============ ТЕСТЫ ============
const TESTS = [
  { id: 'stress', icon: '01', title: 'Уровень стресса', desc: '5 вопросов · 2 минуты',
    questions: [
      { q: 'Как часто вы чувствуете напряжение?', answers: [{ text: 'Почти никогда', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Постоянно', score: 3 }] },
      { q: 'Как вы спите?', answers: [{ text: 'Отлично', score: 0 }, { text: 'Иногда плохо', score: 1 }, { text: 'Часто не могу уснуть', score: 2 }, { text: 'Бессонница', score: 3 }] },
      { q: 'Как быстро вы раздражаетесь?', answers: [{ text: 'Трудно вывести', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто по мелочам', score: 2 }, { text: 'Постоянно', score: 3 }] },
      { q: 'Успеваете ли вы отдыхать?', answers: [{ text: 'Да, регулярно', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Редко', score: 2 }, { text: 'Почти никогда', score: 3 }] },
      { q: 'Есть ли физические симптомы?', answers: [{ text: 'Нет', score: 0 }, { text: 'Редко', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Постоянно', score: 3 }] },
    ],
    results: [
      { max: 4, icon: '✓', title: 'Стресс под контролем', text: 'Вы хорошо справляетесь с нагрузкой.' },
      { max: 9, icon: '—', title: 'Умеренный стресс', text: 'Обратите внимание на отдых.' },
      { max: 20, icon: '!', title: 'Повышенный стресс', text: 'Рекомендуем консультацию психолога.' },
    ] },
  { id: 'anxiety', icon: '02', title: 'Шкала тревожности', desc: '5 вопросов · 2 минуты',
    questions: [
      { q: 'Часто ли вы волнуетесь без причины?', answers: [{ text: 'Нет', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Почти всегда', score: 3 }] },
      { q: 'Трудно ли вам расслабиться?', answers: [{ text: 'Нет', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Постоянно', score: 3 }] },
      { q: 'Бывают ли панические состояния?', answers: [{ text: 'Никогда', score: 0 }, { text: 'Один раз', score: 1 }, { text: 'Несколько раз', score: 2 }, { text: 'Регулярно', score: 3 }] },
      { q: 'Легко ли вам сосредоточиться?', answers: [{ text: 'Да', score: 0 }, { text: 'Обычно да', score: 1 }, { text: 'С трудом', score: 2 }, { text: 'Очень трудно', score: 3 }] },
      { q: 'Беспокоитесь в новой обстановке?', answers: [{ text: 'Нет', score: 0 }, { text: 'Немного', score: 1 }, { text: 'Сильно', score: 2 }, { text: 'Очень сильно', score: 3 }] },
    ],
    results: [
      { max: 4, icon: '✓', title: 'Низкая тревожность', text: 'Вы спокойны и уравновешены.' },
      { max: 9, icon: '—', title: 'Умеренная тревожность', text: 'Стоит обратить внимание на релаксацию.' },
      { max: 20, icon: '!', title: 'Высокая тревожность', text: 'Рекомендуем обратиться к психологу.' },
    ] },
  { id: 'burnout', icon: '03', title: 'Выгорание', desc: '5 вопросов · 2 минуты',
    questions: [
      { q: 'Устаёте уже утром?', answers: [{ text: 'Нет', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Каждый день', score: 3 }] },
      { q: 'Интересует ли вас работа?', answers: [{ text: 'Да, очень', score: 0 }, { text: 'Обычно да', score: 1 }, { text: 'Скорее нет', score: 2 }, { text: 'Совсем нет', score: 3 }] },
      { q: 'Истощены после рабочего дня?', answers: [{ text: 'Нет', score: 0 }, { text: 'Немного', score: 1 }, { text: 'Сильно', score: 2 }, { text: 'Очень сильно', score: 3 }] },
      { q: 'Снизилась продуктивность?', answers: [{ text: 'Нет', score: 0 }, { text: 'Немного', score: 1 }, { text: 'Заметно', score: 2 }, { text: 'Значительно', score: 3 }] },
      { q: 'Бывают эмоциональные срывы?', answers: [{ text: 'Нет', score: 0 }, { text: 'Редко', score: 1 }, { text: 'Иногда', score: 2 }, { text: 'Часто', score: 3 }] },
    ],
    results: [
      { max: 4, icon: '✓', title: 'Выгорания нет', text: 'Вы сохраняете баланс.' },
      { max: 9, icon: '—', title: 'Начальная стадия', text: 'Стоит задуматься об отдыхе.' },
      { max: 20, icon: '!', title: 'Высокое выгорание', text: 'Обратитесь к специалисту.' },
    ] },
];

const MOODS = [
  { value: 1, num: '1', label: 'Плохо' },
  { value: 2, num: '2', label: 'Так себе' },
  { value: 3, num: '3', label: 'Нормально' },
  { value: 4, num: '4', label: 'Хорошо' },
  { value: 5, num: '5', label: 'Отлично' },
];

// ============ TOAST ============
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  const icons = { success: '✓', error: '!', info: 'ℹ' };
  toast.innerHTML = `<span class="toast__icon">${icons[type] || ''}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast--leaving');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ============ ПРЕЛОАДЕР ============
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  if (!preloader || !fill) return;
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 25 + 10;
    if (progress >= 100) {
      progress = 100;
      fill.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => preloader.classList.add('preloader--hidden'), 300);
    } else fill.style.width = progress + '%';
  }, 150);
}

// ============ БУРГЕР ============
function initBurger() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (!burger || !nav) return;
  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    nav.classList.toggle('nav--open');
  });
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('burger--active');
      nav.classList.remove('nav--open');
    });
  });
}

// ============ КУКИ ============
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (localStorage.getItem('mindspace_cookie') === 'accepted') return;
  setTimeout(() => banner.classList.add('cookie-banner--visible'), 2000);
  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('mindspace_cookie', 'accepted');
    banner.classList.remove('cookie-banner--visible');
    showToast('Спасибо! Куки приняты.', 'success');
  });
  document.getElementById('cookieDecline')?.addEventListener('click', () => {
    localStorage.setItem('mindspace_cookie', 'declined');
    banner.classList.remove('cookie-banner--visible');
  });
}

// ============ СЧЁТЧИКИ ============
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const animate = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      el.textContent = value.toLocaleString('ru-RU') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('ru-RU') + suffix;
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animate(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ============ СПЕЦИАЛИСТЫ ============
function renderSpecialists() {
  const grid = document.getElementById('specialistsGrid');
  if (!grid) return;
  SPECIALISTS = loadSpecialists();
  FAVORITES = loadFavorites();

  const filterSpec = document.getElementById('filterSpec')?.value || '';
  const filterPrice = Number(document.getElementById('filterPrice')?.value) || 0;
  const filterSearch = (document.getElementById('filterSearch')?.value || '').toLowerCase().trim();

  const filtered = SPECIALISTS.filter(s => {
    if (filterSpec && s.spec !== filterSpec) return false;
    if (filterPrice && s.price > filterPrice) return false;
    if (filterSearch && !s.name.toLowerCase().includes(filterSearch)) return false;
    return true;
  });

  const emptyMsg = document.getElementById('emptyMessage');
  if (emptyMsg) emptyMsg.hidden = filtered.length > 0;

  grid.innerHTML = filtered.map(s => {
    const isFav = FAVORITES.includes(s.id);
    return `
      <div class="card">
        <button class="card__fav ${isFav ? 'card__fav--active' : ''}" data-fav="${s.id}" title="${isFav ? 'Убрать из избранного' : 'В избранное'}">❤️</button>
        <div class="card__avatar" style="background: ${s.color};">${s.initials}</div>
        <h3 class="card__name">${s.name}</h3>
        <p class="card__spec">${s.specName}</p>
        <div class="card__meta">
          <span>★ ${s.rating} (${s.reviews})</span>
          <span>Опыт: ${s.experience} лет</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
          <span style="font-size: 13px; color: var(--text-soft);">Сессия</span>
          <span class="card__price">${s.price} ₽</span>
        </div>
        <button class="card__btn" data-open-profile="${s.id}">Подробнее</button>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('[data-open-profile]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sp = SPECIALISTS.find(x => x.id === Number(btn.dataset.openProfile));
      if (sp) openProfileModal(sp);
    });
  });

  grid.querySelectorAll('[data-fav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const id = Number(btn.dataset.fav);
      toggleFavorite(id);
      renderSpecialists();
    });
  });
}

// ============ МОДАЛКА ИЗБРАННОГО ============
function openFavoritesModal() {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modalBody');
  if (!modal || !body) return;

  FAVORITES = loadFavorites();
  const favList = SPECIALISTS.filter(s => FAVORITES.includes(s.id));

  if (!favList.length) {
    body.innerHTML = `
      <h3 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: 8px;">Избранное</h3>
      <p style="color: var(--text-soft); margin-bottom: 20px;">Вы пока не добавили ни одного психолога в избранное.</p>
      <p style="font-size: 14px; color: var(--text-soft);">Нажмите ❤️ на карточке психолога, чтобы сохранить его здесь.</p>
    `;
    modal.classList.add('modal--open');
    return;
  }

  body.innerHTML = `
    <h3 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: 20px;">❤️ Избранное (${favList.length})</h3>
    <div class="fav-list">
      ${favList.map(s => `
        <div class="fav-item">
          <div class="fav-item__avatar" style="background: ${s.color};">${s.initials}</div>
          <div class="fav-item__info">
            <div class="fav-item__name">${s.name}</div>
            <div class="fav-item__meta">${s.specName} · ${s.price} ₽</div>
          </div>
          <button class="btn btn--primary btn--small" data-fav-open="${s.id}">Открыть</button>
        </div>
      `).join('')}
    </div>
  `;

  modal.classList.add('modal--open');

  body.querySelectorAll('[data-fav-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sp = SPECIALISTS.find(x => x.id === Number(btn.dataset.favOpen));
      closeModal();
      if (sp) openProfileModal(sp);
    });
  });
}

// ============ ПРОФИЛЬ ПСИХОЛОГА ============
function openProfileModal(sp) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modalBody');
  const win = document.getElementById('modalWindow');
  if (!modal || !body) return;
  win.classList.add('modal__window--wide');

  body.innerHTML = `
    <div class="profile-header">
      <div class="profile-header__avatar" style="background: ${sp.color};">${sp.initials}</div>
      <div class="profile-header__info">
        <div class="profile-header__name">${sp.name}</div>
        <div class="profile-header__spec">${sp.specName} · Опыт ${sp.experience} лет</div>
        <div style="margin-top: 8px; font-size: 14px; color: var(--text-soft);">
          ★ ${sp.rating} · ${sp.reviews} отзывов · <strong style="color: var(--text);">${sp.price} ₽</strong> за сессию
        </div>
      </div>
    </div>
    <div class="profile-tabs" id="profileTabs">
      <button class="profile-tab profile-tab--active" data-tab="bio">О себе</button>
      <button class="profile-tab" data-tab="edu">Образование</button>
      <button class="profile-tab" data-tab="slots">Расписание</button>
    </div>
    <div class="profile-content" id="profileContent"></div>
  `;

  const renderTab = (tab) => {
    const content = document.getElementById('profileContent');
    if (tab === 'bio') {
      content.innerHTML = `
        <p>${sp.bio || 'Психолог с опытом работы.'}</p>
        <p><strong>Подход:</strong> ${sp.approach || 'Индивидуальный'}</p>
        <p><strong>Языки:</strong> ${sp.languages || 'Русский'}</p>
      `;
    } else if (tab === 'edu') {
      content.innerHTML = `<p><strong>Образование:</strong></p><p>${sp.education || 'Не указано'}</p>`;
    } else if (tab === 'slots') {
      const slots = sp.slots || [];
      if (!slots.length) {
        content.innerHTML = '<p>Свободных окошек пока нет.</p>';
      } else {
        content.innerHTML = `
          <p style="margin-bottom: 12px;">Выберите удобное время:</p>
          <div class="slots-grid">
            ${slots.map((slot, i) => `
              <button class="slot ${slot.booked ? 'slot--booked' : ''}" data-slot-index="${i}" ${slot.booked ? 'disabled' : ''}>
                ${formatDate(slot.date)}<br>${slot.time}<br>
                <span style="font-size: 11px; opacity: 0.75;">${formatDuration(slot.duration)}</span>
              </button>
            `).join('')}
          </div>
        `;
        content.querySelectorAll('.slot:not(.slot--booked)').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = Number(btn.dataset.slotIndex);
            const slot = sp.slots[idx];
            closeModal();
            openBookingModal(sp, slot);
          });
        });
      }
    }
  };
  renderTab('bio');

  document.querySelectorAll('#profileTabs .profile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#profileTabs .profile-tab').forEach(t => t.classList.remove('profile-tab--active'));
      tab.classList.add('profile-tab--active');
      renderTab(tab.dataset.tab);
    });
  });

  modal.classList.add('modal--open');
}

// ============ МОДАЛКА ============
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('modal--open');
  const w = document.getElementById('modalWindow');
  if (w) w.classList.remove('modal__window--wide');
}

// ============ БРОНИРОВАНИЕ ============
let bookingStep = 1;
let bookingData = { specialist: null, slot: null, name: '', email: '' };

function openBookingModal(sp, slot = null) {
  if (sp === null) {
    bookingStep = 1;
    bookingData = { specialist: null, slot: null, name: '', email: '' };
  } else if (slot === null) {
    bookingStep = 2;
    bookingData = { specialist: sp, slot: null, name: '', email: '' };
  } else {
    bookingStep = 2;
    bookingData = { specialist: sp, slot: slot, name: '', email: '' };
  }
  renderBookingStep();
}

function renderBookingStep() {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modalBody');
  if (!modal || !body) return;
  const sp = bookingData.specialist;
  modal.classList.add('modal--open');

  const stepsProgress = `
    <div class="booking-steps">
      <div class="booking-steps__step ${bookingStep >= 1 ? 'booking-steps__step--active' : ''}"></div>
      <div class="booking-steps__step ${bookingStep >= 2 ? 'booking-steps__step--active' : ''}"></div>
      <div class="booking-steps__step ${bookingStep >= 3 ? 'booking-steps__step--active' : ''}"></div>
    </div>
  `;

  if (bookingStep === 1) {
    body.innerHTML = `
      ${stepsProgress}
      <h3 class="booking-step-title">Шаг 1. Выберите психолога</h3>
      <p class="booking-step-subtitle">Мы подберём свободные окошки</p>
      <div class="admin-list">
        ${SPECIALISTS.map(s => `
          <div class="admin-item">
            <div class="admin-item__info">
              <div class="admin-item__name">${s.name}</div>
              <div class="admin-item__meta">${s.specName} · ${s.price} ₽</div>
            </div>
            <button class="btn btn--primary btn--small" data-select-sp="${s.id}">Выбрать</button>
          </div>
        `).join('')}
      </div>
    `;
    body.querySelectorAll('[data-select-sp]').forEach(btn => {
      btn.addEventListener('click', () => {
        bookingData.specialist = SPECIALISTS.find(x => x.id === Number(btn.dataset.selectSp));
        bookingStep = 2;
        renderBookingStep();
      });
    });
  } else if (bookingStep === 2) {
    const freeSlots = (sp.slots || []).filter(s => !s.booked);
    body.innerHTML = `
      ${stepsProgress}
      <h3 class="booking-step-title">Шаг 2. Выберите время</h3>
      <p class="booking-step-subtitle">${sp.name} · ${sp.specName}</p>
      ${freeSlots.length ? `
        <div class="slots-grid" style="margin-bottom: 20px;">
          ${freeSlots.map((slot, i) => `
            <button class="slot ${bookingData.slot && bookingData.slot.date === slot.date && bookingData.slot.time === slot.time ? 'slot--selected' : ''}" data-slot="${i}">
              ${formatDate(slot.date)}<br>${slot.time}<br>
              <span style="font-size: 11px; opacity: 0.75;">${formatDuration(slot.duration)}</span>
            </button>
          `).join('')}
        </div>
      ` : '<p style="color: var(--text-soft); margin-bottom: 20px;">Свободных окошек нет</p>'}
      <div class="booking-buttons">
        <button class="btn btn--ghost" id="prevStep">← Назад</button>
        <button class="btn btn--primary" id="nextStep" ${freeSlots.length ? '' : 'disabled'}>Далее →</button>
      </div>
    `;
    body.querySelectorAll('[data-slot]').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('[data-slot]').forEach(b => b.classList.remove('slot--selected'));
        btn.classList.add('slot--selected');
        bookingData.slot = freeSlots[Number(btn.dataset.slot)];
      });
    });
    document.getElementById('prevStep').addEventListener('click', () => { bookingStep = 1; renderBookingStep(); });
    document.getElementById('nextStep')?.addEventListener('click', () => {
      if (!bookingData.slot) { showToast('Выберите время', 'error'); return; }
      bookingStep = 3; renderBookingStep();
    });
  } else {
    body.innerHTML = `
      ${stepsProgress}
      <h3 class="booking-step-title">Шаг 3. Ваши контакты</h3>
      <p class="booking-step-subtitle">Куда прислать подтверждение?</p>
      <div class="form-field">
        <label class="form-field__label">Имя</label>
        <input type="text" id="bookName" class="form-field__input" placeholder="Иван" value="${bookingData.name}">
        <p class="form-field__error" id="errorName"></p>
      </div>
      <div class="form-field">
        <label class="form-field__label">Email</label>
        <input type="email" id="bookEmail" class="form-field__input" placeholder="ivan@example.com" value="${bookingData.email}">
        <p class="form-field__error" id="errorEmail"></p>
      </div>
      <div class="booking-summary">
        <div>
          <div style="font-size: 12px; color: var(--text-soft);">Сессия</div>
          <div style="font-weight: 700;">${sp.name}</div>
          <div style="font-size: 13px; color: var(--text-soft);">
            ${formatDate(bookingData.slot.date)}, ${bookingData.slot.time} · ${formatDuration(bookingData.slot.duration)}
          </div>
        </div>
        <strong>${sp.price} ₽</strong>
      </div>
      <div class="booking-buttons">
        <button class="btn btn--ghost" id="prevStep">← Назад</button>
        <button class="btn btn--primary" id="confirmBtn">Подтвердить</button>
      </div>
    `;
    document.getElementById('prevStep').addEventListener('click', () => { bookingStep = 2; renderBookingStep(); });
    document.getElementById('confirmBtn').addEventListener('click', () => {
      const name = document.getElementById('bookName').value.trim();
      const email = document.getElementById('bookEmail').value.trim();
      const errName = document.getElementById('errorName');
      const errEmail = document.getElementById('errorEmail');
      let ok = true;
      if (name.length < 2) { errName.textContent = 'Минимум 2 символа'; ok = false; } else errName.textContent = '';
      if (!email.includes('@') || !email.includes('.')) { errEmail.textContent = 'Некорректный email'; ok = false; } else errEmail.textContent = '';
      if (!ok) return;

      const all = loadSpecialists();
      const found = all.find(x => x.id === sp.id);
      if (found) {
        const slot = found.slots.find(s => s.date === bookingData.slot.date && s.time === bookingData.slot.time);
        if (slot) slot.booked = true;
        saveSpecialists(all);
        SPECIALISTS = all;
      }
      addNotification(`Новая запись: ${name} → ${sp.name} (${formatDate(bookingData.slot.date)}, ${bookingData.slot.time})`);
      createBackup();
      renderSpecialists();
      showToast(`Заявка отправлена, ${name}!`, 'success');
      closeModal();
    });
  }
}

// ============ ТЕСТЫ ============
let currentTest = null, currentStep = 0, answers = [], selectedAnswer = null;

function renderTests() {
  const grid = document.getElementById('testsGrid');
  if (!grid) return;
  grid.innerHTML = TESTS.map(t => `
    <div class="test-card">
      <div class="test-card__icon">${t.icon}</div>
      <h3 class="test-card__title">${t.title}</h3>
      <p class="test-card__desc">${t.desc}</p>
      <button class="btn btn--primary" data-test="${t.id}" style="margin-top: auto;">Пройти тест</button>
    </div>
  `).join('');
  grid.querySelectorAll('[data-test]').forEach(btn => {
    btn.addEventListener('click', () => {
      const test = TESTS.find(t => t.id === btn.dataset.test);
      if (test) { currentTest = test; currentStep = 0; answers = []; selectedAnswer = null; renderTestStep(); }
    });
  });
}

function renderTestStep() {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modalBody');
  if (!modal || !body) return;
  const q = currentTest.questions[currentStep];
  const total = currentTest.questions.length;
  body.innerHTML = `
    <h3 style="font-family: var(--font-heading); font-size: 22px; margin-bottom: 6px;">${currentTest.title}</h3>
    <p style="color: var(--text-soft); margin-bottom: 24px; font-size: 14px;">Вопрос ${currentStep + 1} из ${total}</p>
    <div class="progress-bar"><div class="progress-bar__fill" style="width: ${(currentStep / total) * 100}%"></div></div>
    <div class="test-question">
      <p class="test-question__text">${q.q}</p>
      <div class="test-answers">
        ${q.answers.map((a, i) => `<button class="test-answer" data-i="${i}">${a.text}</button>`).join('')}
      </div>
    </div>
  `;
  modal.classList.add('modal--open');
  body.querySelectorAll('.test-answer').forEach(btn => {
    btn.addEventListener('click', () => {
      body.querySelectorAll('.test-answer').forEach(b => b.classList.remove('test-answer--selected'));
      btn.classList.add('test-answer--selected');
      selectedAnswer = Number(btn.dataset.i);
      setTimeout(() => {
        if (selectedAnswer === null) return;
        answers.push(currentTest.questions[currentStep].answers[selectedAnswer].score);
        selectedAnswer = null;
        currentStep++;
        if (currentStep >= currentTest.questions.length) showTestResult();
        else renderTestStep();
      }, 300);
    });
  });
}

function showTestResult() {
  const body = document.getElementById('modalBody');
  if (!body) return;
  const total = answers.reduce((a, b) => a + b, 0);
  const result = currentTest.results.find(r => total <= r.max) || currentTest.results[currentTest.results.length - 1];
  body.innerHTML = `
    <div class="test-result">
      <div class="test-result__icon">${result.icon}</div>
      <h3 class="test-result__title">${result.title}</h3>
      <p class="test-result__text">${result.text}</p>
      <p style="color: var(--text-soft); margin-bottom: 24px; font-size: 14px;">Ваш балл: ${total}</p>
      <button class="btn btn--primary" id="closeTestResult">Понятно</button>
    </div>
  `;
  document.getElementById('closeTestResult').addEventListener('click', closeModal);
}

// ============ ДНЕВНИК ============
let moodDate = new Date();
let moodData = JSON.parse(localStorage.getItem('mindspace_mood') || '{}');

function moodKey(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function renderMood() {
  const grid = document.getElementById('moodGrid');
  if (!grid) return;
  const y = moodDate.getFullYear(), m = moodDate.getMonth();
  const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  document.getElementById('currentMonth').textContent = `${monthNames[m]} ${y}`;

  let firstDay = new Date(y, m, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  let html = '';
  for (let i = 0; i < firstDay; i++) html += `<div class="mood-day mood-day--empty"></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const key = moodKey(y, m, d);
    const mood = moodData[key];
    const future = isFutureDate(y, m, d);
    const today = isTodayDate(y, m, d);

    const cls = ['mood-day'];
    if (mood && !future) cls.push(`mood-day--${mood}`);
    if (today) cls.push('mood-day--today');
    if (future) cls.push('mood-day--future');

    html += `<div class="${cls.join(' ')}" data-key="${key}" data-day="${d}" data-future="${future}">${d}</div>`;
  }
  grid.innerHTML = html;

  grid.querySelectorAll('.mood-day[data-key]').forEach(el => {
    if (el.dataset.future === 'true') return;
    el.addEventListener('click', () => openMoodPicker(el.dataset.key, el.dataset.day));
  });

  renderMoodChart();
  renderMoodSummary();
}

function openMoodPicker(key, day) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modalBody');
  if (!modal || !body) return;
  const parts = key.split('-');
  const picked = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  picked.setHours(0, 0, 0, 0);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  if (picked.getTime() > today.getTime()) return;

  const current = moodData[key];
  body.innerHTML = `
    <h3 style="font-family: var(--font-heading); font-size: 22px; margin-bottom: 6px;">Как ваше настроение?</h3>
    <p style="color: var(--text-soft); margin-bottom: 24px; font-size: 14px;">День ${day}</p>
    <div style="display: flex; gap: 8px; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap;">
      ${MOODS.map(m => `
        <button class="mood-btn" data-value="${m.value}" style="
          flex: 1 1 calc(20% - 8px); min-width: 60px; padding: 12px 6px; border-radius: 10px;
          background: ${current === m.value ? 'var(--mint)' : 'var(--bg-gray)'};
          border: 2px solid ${current === m.value ? 'var(--mint-dark)' : 'transparent'};
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          cursor: pointer; transition: all 0.15s; font-family: inherit;
        ">
          <span style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; line-height: 1;">${m.num}</span>
          <span style="font-size: 11px; font-weight: 600; line-height: 1.1; text-align: center;">${m.label}</span>
        </button>
      `).join('')}
    </div>
    ${current ? '<button id="removeMood" style="width: 100%; padding: 12px; color: var(--red); font-weight: 600; font-size: 14px; cursor: pointer;">Удалить отметку</button>' : ''}
  `;
  modal.classList.add('modal--open');
  body.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      moodData[key] = Number(btn.dataset.value);
      localStorage.setItem('mindspace_mood', JSON.stringify(moodData));
      closeModal(); renderMood();
      showToast('Настроение сохранено', 'success', 2000);
    });
  });
  document.getElementById('removeMood')?.addEventListener('click', () => {
    delete moodData[key];
    localStorage.setItem('mindspace_mood', JSON.stringify(moodData));
    closeModal(); renderMood();
  });
}

function renderMoodChart() {
  const canvas = document.getElementById('moodChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width, h = rect.height, pad = 30;
  ctx.clearRect(0, 0, w, h);

  const y = moodDate.getFullYear(), m = moodDate.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const points = [];
  for (let d = 1; d <= daysInMonth; d++) {
    if (isFutureDate(y, m, d)) points.push(null);
    else points.push(moodData[moodKey(y, m, d)] || null);
  }

  ctx.strokeStyle = 'rgba(43, 43, 43, 0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const yy = pad + (h - 2 * pad) * (i / 5);
    ctx.beginPath(); ctx.moveTo(pad, yy); ctx.lineTo(w - pad, yy); ctx.stroke();
  }
  const hasData = points.some(p => p !== null);
  if (!hasData) {
    ctx.fillStyle = '#6B6B6B';
    ctx.font = '14px Manrope, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Отметьте настроение, чтобы увидеть график', w / 2, h / 2);
    return;
  }
  const stepX = (w - 2 * pad) / (daysInMonth - 1);
  const scaleY = (h - 2 * pad) / 5;
  ctx.beginPath();
  let started = false;
  points.forEach((v, i) => {
    if (v === null) return;
    const x = pad + stepX * i;
    const yy = h - pad - v * scaleY;
    if (!started) { ctx.moveTo(x, yy); started = true; }
    else ctx.lineTo(x, yy);
  });
  ctx.strokeStyle = '#A8D5BA'; ctx.lineWidth = 3;
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
  points.forEach((v, i) => {
    if (v === null) return;
    const x = pad + stepX * i;
    const yy = h - pad - v * scaleY;
    ctx.beginPath(); ctx.arc(x, yy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#A8D5BA'; ctx.fill();
    ctx.strokeStyle = '#FAF7F2'; ctx.lineWidth = 2; ctx.stroke();
  });
}

function renderMoodSummary() {
  const y = moodDate.getFullYear(), m = moodDate.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const values = [];
  let bestDay = null, bestValue = 0;

  for (let d = 1; d <= daysInMonth; d++) {
    if (isFutureDate(y, m, d)) continue;
    const v = moodData[moodKey(y, m, d)];
    if (v) { values.push(v); if (v > bestValue) { bestValue = v; bestDay = d; } }
  }
  const avgEl = document.getElementById('moodAvg');
  if (avgEl) avgEl.textContent = values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : '—';
  document.getElementById('moodBest').textContent = bestDay ? bestDay : '—';
  document.getElementById('moodCount').textContent = values.length;
}

// ============ АНИМАЦИЯ ============
function initReveal() {
  const targets = document.querySelectorAll('.section, .step, .card, .test-card, .stat');
  if (!targets.length) return;
  targets.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(el => observer.observe(el));
}

// ============ СКРОЛЛ ============
function initSmoothScroll() {
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', () => {
      const target = document.getElementById(el.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ============ ФИЛЬТРЫ ============
function initFilters() {
  ['filterSpec', 'filterPrice', 'filterSearch'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', renderSpecialists);
      el.addEventListener('change', renderSpecialists);
    }
  });
}

// ============ МОДАЛКА ЗАКРЫТИЕ ============
function initModalClose() {
  document.querySelectorAll('[data-close="true"]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.getElementById('adminPanel').classList.remove('admin-panel--open');
    }
  });
}

// ============ ПРОГРЕСС-БАР ============
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = percent + '%';
  });
}

// ============ КНОПКА НАВЕРХ ============
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('scroll-top--visible', window.scrollY > 500);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============ ТЕМА ============
function initTheme() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  let isDark = localStorage.getItem('mindspace_theme') === 'dark';
  const apply = () => {
    document.body.classList.toggle('dark', isDark);
    btn.textContent = isDark ? '☀️' : '🌙';
  };
  apply();
  btn.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('mindspace_theme', isDark ? 'dark' : 'light');
    apply();
  });
}

// ============ ДНЕВНИК НАВИГАЦИЯ ============
function initMoodNav() {
  document.getElementById('prevMonth')?.addEventListener('click', () => { moodDate.setMonth(moodDate.getMonth() - 1); renderMood(); });
  document.getElementById('nextMonth')?.addEventListener('click', () => { moodDate.setMonth(moodDate.getMonth() + 1); renderMood(); });
  window.addEventListener('resize', renderMoodChart);
}

// ============ КНОПКИ "ЗАПИСАТЬСЯ" ============
function initBookingButtons() {
  document.getElementById('bookingBtn')?.addEventListener('click', () => {
    openBookingModal(null, null);
  });
  document.getElementById('bookingBtnCta')?.addEventListener('click', () => {
    openBookingModal(null, null);
  });
}

// ============================================================
// АДМИН
// ============================================================
function initAdmin() {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      if (isAdminLogged()) openAdminPanel();
      else openLoginModal();
    });
  }
  document.getElementById('adminClose')?.addEventListener('click', () => {
    document.getElementById('adminPanel').classList.remove('admin-panel--open');
  });
  document.getElementById('adminLogout')?.addEventListener('click', () => {
    setAdminLogged(false);
    document.getElementById('adminPanel').classList.remove('admin-panel--open');
    updateLoginBtn();
    showToast('Вы вышли из админки', 'info');
  });
  updateLoginBtn();
}

function updateLoginBtn() {
  const btn = document.getElementById('loginBtn');
  if (!btn) return;
  btn.textContent = isAdminLogged() ? '👤 Админка' : 'Войти';
}

function initFavBtn() {
  const btn = document.getElementById('favBtn');
  if (!btn) return;
  btn.addEventListener('click', openFavoritesModal);
  updateFavCount();
}

function openLoginModal() {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modalBody');
  if (!modal || !body) return;
  body.innerHTML = `
    <h3 style="font-family: var(--font-heading); font-size: 26px; margin-bottom: 8px;">Вход для администратора</h3>
    <p style="color: var(--text-soft); margin-bottom: 24px; font-size: 14px;">Введите логин и пароль</p>
    <div class="form-field">
      <label class="form-field__label">Логин</label>
      <input type="text" id="loginName" class="form-field__input" placeholder="admin">
    </div>
    <div class="form-field">
      <label class="form-field__label">Пароль</label>
      <input type="password" id="loginPass" class="form-field__input" placeholder="•••••••">
      <p class="form-field__error" id="loginError"></p>
    </div>
    <button class="btn btn--primary btn--full" id="loginSubmit" style="margin-top: 8px;">Войти</button>
    <p style="text-align: center; font-size: 12px; color: var(--text-soft); margin-top: 16px;">Демо-доступ: admin / admin123</p>
  `;
  modal.classList.add('modal--open');
  const submit = () => {
    const name = document.getElementById('loginName').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    const err = document.getElementById('loginError');
    if (name === ADMIN_LOGIN && pass === ADMIN_PASSWORD) {
      setAdminLogged(true); updateLoginBtn();
      requestNotificationPermission();
      closeModal(); openAdminPanel();
      showToast('Добро пожаловать, администратор!', 'success');
    } else err.textContent = 'Неверный логин или пароль';
  };
  document.getElementById('loginSubmit').addEventListener('click', submit);
  document.getElementById('loginPass').addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
}

// ============ ПАНЕЛЬ АДМИНА ============
let adminTab = 'list';
let editingSpecialistId = null;

function openAdminPanel() {
  const panel = document.getElementById('adminPanel');
  if (!panel) return;
  panel.classList.add('admin-panel--open');
  renderAdminPanel();
}

function renderAdminPanel() {
  const body = document.getElementById('adminPanelBody');
  if (!body) return;
  const unread = getUnreadCount();
  const unreadBadge = unread > 0 ? `<span class="admin-tab__badge">${unread}</span>` : '';

  body.innerHTML = `
    <div class="admin-tabs">
      <button class="admin-tab ${adminTab === 'list' ? 'admin-tab--active' : ''}" data-tab="list">Психологи</button>
      <button class="admin-tab ${adminTab === 'add' ? 'admin-tab--active' : ''}" data-tab="add">${editingSpecialistId ? 'Ред.' : '+ Добавить'}</button>
      <button class="admin-tab ${adminTab === 'slots' ? 'admin-tab--active' : ''}" data-tab="slots">Окошки</button>
      <button class="admin-tab ${adminTab === 'notifs' ? 'admin-tab--active' : ''}" data-tab="notifs">Уведомл.${unreadBadge}</button>
      <button class="admin-tab ${adminTab === 'stats' ? 'admin-tab--active' : ''}" data-tab="stats">Статистика</button>
      <button class="admin-tab ${adminTab === 'backup' ? 'admin-tab--active' : ''}" data-tab="backup">Копии</button>
    </div>
    <div id="adminContent"></div>
  `;
  body.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      adminTab = tab.dataset.tab;
      if (adminTab !== 'add') editingSpecialistId = null;
      if (adminTab === 'notifs') markNotificationsRead();
      renderAdminPanel();
    });
  });

  const content = document.getElementById('adminContent');
  if (!content) return;

  if (adminTab === 'list') {
    content.innerHTML = `
      <div class="admin-list">
        ${SPECIALISTS.map(s => `
          <div class="admin-item">
            <div class="admin-item__info">
              <div class="admin-item__name">${s.name}</div>
              <div class="admin-item__meta">${s.specName} · ${s.price} ₽ · слотов: ${(s.slots || []).length}</div>
            </div>
            <div class="admin-item__actions">
              <button class="admin-item__btn" data-edit="${s.id}" title="Редактировать">✏️</button>
              <button class="admin-item__btn admin-item__btn--danger" data-del="${s.id}" title="Удалить">🗑️</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    content.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => { editingSpecialistId = Number(btn.dataset.edit); adminTab = 'add'; renderAdminPanel(); });
    });
    content.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.del);
        if (!confirm('Удалить психолога?')) return;
        const name = SPECIALISTS.find(x => x.id === id)?.name;
        SPECIALISTS = SPECIALISTS.filter(x => x.id !== id);
        saveSpecialists(SPECIALISTS);
        FAVORITES = FAVORITES.filter(fid => fid !== id);
        saveFavorites(FAVORITES);
        if (name) addNotification(`Психолог удалён: ${name}`);
        renderSpecialists(); renderAdminPanel();
        showToast('Психолог удалён', 'success');
      });
    });
  } else if (adminTab === 'add') {
    renderAddForm(content);
  } else if (adminTab === 'slots') {
    renderSlotsTab(content);
  } else if (adminTab === 'notifs') {
    renderNotifsTab(content);
  } else if (adminTab === 'stats') {
    renderStatsTab(content);
  } else if (adminTab === 'backup') {
    renderBackupTab(content);
  }
}

function renderAddForm(content) {
  const editing = editingSpecialistId ? SPECIALISTS.find(x => x.id === editingSpecialistId) : null;
  content.innerHTML = `
    <div class="form-field"><label class="form-field__label">ФИО *</label><input type="text" id="fName" class="form-field__input" value="${editing?.name || ''}" placeholder="Иван Иванов"></div>
    <div class="form-field"><label class="form-field__label">Инициалы (2 буквы)</label><input type="text" id="fInitials" class="form-field__input" maxlength="2" value="${editing?.initials || ''}" placeholder="ИИ"></div>
    <div class="form-field">
      <label class="form-field__label">Цвет аватара</label>
      <select id="fColor" class="form-field__select">
        <option value="#A8D5BA" ${editing?.color === '#A8D5BA' ? 'selected' : ''}>Мята</option>
        <option value="#B8A9D9" ${editing?.color === '#B8A9D9' ? 'selected' : ''}>Лаванда</option>
        <option value="#F2C4A7" ${editing?.color === '#F2C4A7' ? 'selected' : ''}>Персик</option>
        <option value="#7BC47F" ${editing?.color === '#7BC47F' ? 'selected' : ''}>Зелёный</option>
      </select>
    </div>
    <div class="form-field">
      <label class="form-field__label">Специализация *</label>
      <select id="fSpec" class="form-field__select">
        <option value="anxiety" ${editing?.spec === 'anxiety' ? 'selected' : ''}>Тревожность</option>
        <option value="depression" ${editing?.spec === 'depression' ? 'selected' : ''}>Депрессия</option>
        <option value="relations" ${editing?.spec === 'relations' ? 'selected' : ''}>Отношения</option>
        <option value="career" ${editing?.spec === 'career' ? 'selected' : ''}>Карьера</option>
        <option value="child" ${editing?.spec === 'child' ? 'selected' : ''}>Детская психология</option>
      </select>
    </div>
    <div class="form-field"><label class="form-field__label">Опыт (лет)</label><input type="number" id="fExp" class="form-field__input" value="${editing?.experience || 5}" min="1" max="40"></div>
    <div class="form-field"><label class="form-field__label">Цена (₽ за сессию)</label><input type="number" id="fPrice" class="form-field__input" value="${editing?.price || 2500}" min="500" step="100"></div>
    <div class="form-field"><label class="form-field__label">О себе</label><textarea id="fBio" class="form-field__textarea" placeholder="Коротко о подходе и опыте">${editing?.bio || ''}</textarea></div>
    <div class="form-field"><label class="form-field__label">Образование</label><input type="text" id="fEdu" class="form-field__input" value="${editing?.education || ''}" placeholder="МГУ, 2016"></div>
    <div class="form-field"><label class="form-field__label">Языки</label><input type="text" id="fLang" class="form-field__input" value="${editing?.languages || 'Русский'}" placeholder="Русский, английский"></div>
    <div class="form-field"><label class="form-field__label">Подход</label><input type="text" id="fApproach" class="form-field__input" value="${editing?.approach || ''}" placeholder="КПТ, ACT"></div>
    <button class="btn btn--primary btn--full" id="saveSpecialist" style="margin-top: 8px;">${editing ? 'Сохранить' : 'Добавить'}</button>
  `;
  document.getElementById('saveSpecialist').addEventListener('click', () => {
    const name = document.getElementById('fName').value.trim();
    const initials = document.getElementById('fInitials').value.trim() || name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const color = document.getElementById('fColor').value;
    const specVal = document.getElementById('fSpec').value;
    const specLabels = { anxiety: 'Тревожность', depression: 'Депрессия', relations: 'Отношения', career: 'Карьера', child: 'Детская психология' };
    const exp = Number(document.getElementById('fExp').value) || 5;
    const price = Number(document.getElementById('fPrice').value) || 2500;
    const bio = document.getElementById('fBio').value.trim();
    const education = document.getElementById('fEdu').value.trim();
    const languages = document.getElementById('fLang').value.trim();
    const approach = document.getElementById('fApproach').value.trim();
    if (name.length < 3) { showToast('Введите ФИО', 'error'); return; }
    if (editing) {
      const idx = SPECIALISTS.findIndex(x => x.id === editing.id);
      SPECIALISTS[idx] = { ...SPECIALISTS[idx], name, initials, color, spec: specVal, specName: specLabels[specVal], experience: exp, price, bio, education, languages, approach };
      addNotification(`Обновлён психолог: ${name}`);
      showToast('Изменения сохранены', 'success');
    } else {
      const newId = Math.max(0, ...SPECIALISTS.map(s => s.id)) + 1;
      SPECIALISTS.push({ id: newId, name, initials, color, spec: specVal, specName: specLabels[specVal], experience: exp, price, rating: 5.0, reviews: 0, bio, education, languages, approach, slots: [] });
      addNotification(`Добавлен психолог: ${name}`);
      showToast('Психолог добавлен', 'success');
    }
    saveSpecialists(SPECIALISTS);
    createBackup();
    renderSpecialists();
    editingSpecialistId = null; adminTab = 'list';
    renderAdminPanel();
  });
}

function renderSlotsTab(content) {
  content.innerHTML = `
    <p style="color: var(--text-soft); margin-bottom: 16px; font-size: 14px;">Выберите психолога и добавьте окошки.</p>
    <div class="form-field"><label class="form-field__label">Психолог</label><select id="slotSpec" class="form-field__select">${SPECIALISTS.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
    <div class="form-field"><label class="form-field__label">Дата</label><input type="date" id="slotDate" class="form-field__input"></div>
    <div class="form-field"><label class="form-field__label">Время начала</label><input type="time" id="slotTime" class="form-field__input" value="12:00"></div>
    <div class="form-field">
      <label class="form-field__label">Длительность</label>
      <select id="slotDuration" class="form-field__select">
        <option value="30">30 минут</option>
        <option value="45">45 минут</option>
        <option value="60" selected>60 минут (1 час)</option>
        <option value="90">90 минут (1.5 часа)</option>
        <option value="120">120 минут (2 часа)</option>
      </select>
    </div>
    <button class="btn btn--primary btn--full" id="addSlot" style="margin-bottom: 24px;">+ Добавить окошко</button>
    <div id="slotsList"></div>
  `;
  const renderSlotsList = () => {
    const spId = Number(document.getElementById('slotSpec').value);
    const sp = SPECIALISTS.find(x => x.id === spId);
    const list = document.getElementById('slotsList');
    if (!sp || !list) return;
    const slots = sp.slots || [];
    list.innerHTML = slots.length ? `
      <p style="font-weight: 600; margin-bottom: 12px;">Окошки ${sp.name}:</p>
      <div class="admin-list">
        ${slots.map((slot, i) => `
          <div class="admin-item">
            <div class="admin-item__info">
              <div class="admin-item__name">${formatDate(slot.date)} · ${slot.time} · ${formatDuration(slot.duration)}</div>
              <div class="admin-item__meta">${slot.booked ? '🔒 занято' : '🔓 свободно'}</div>
            </div>
            <div class="admin-item__actions">
              <button class="admin-item__btn" data-toggleslot="${i}">${slot.booked ? '🔒' : '🔓'}</button>
              <button class="admin-item__btn admin-item__btn--danger" data-delslot="${i}">🗑️</button>
            </div>
          </div>
        `).join('')}
      </div>
    ` : '<p style="color: var(--text-soft);">Пока нет окошек.</p>';
    list.querySelectorAll('[data-toggleslot]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.toggleslot);
        const all = loadSpecialists();
        const found = all.find(x => x.id === spId);
        if (found && found.slots[idx]) {
          found.slots[idx].booked = !found.slots[idx].booked;
          saveSpecialists(all); SPECIALISTS = all;
          renderSpecialists(); renderSlotsList();
          showToast(found.slots[idx].booked ? 'Закрыто' : 'Открыто', 'success');
        }
      });
    });
    list.querySelectorAll('[data-delslot]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.delslot);
        const all = loadSpecialists();
        const found = all.find(x => x.id === spId);
        if (found) {
          found.slots.splice(idx, 1);
          saveSpecialists(all); SPECIALISTS = all;
          renderSpecialists(); renderSlotsList();
          showToast('Окошко удалено', 'success');
        }
      });
    });
  };
  document.getElementById('slotSpec').addEventListener('change', renderSlotsList);
  document.getElementById('addSlot').addEventListener('click', () => {
    const spId = Number(document.getElementById('slotSpec').value);
    const date = document.getElementById('slotDate').value;
    const time = document.getElementById('slotTime').value;
    const duration = Number(document.getElementById('slotDuration').value) || 60;
    if (!date || !time) { showToast('Укажите дату и время', 'error'); return; }
    const all = loadSpecialists();
    const found = all.find(x => x.id === spId);
    if (!found) return;
    if (!found.slots) found.slots = [];
    found.slots.push({ date, time, duration, booked: false });
    found.slots.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    saveSpecialists(all); SPECIALISTS = all;
    renderSpecialists(); renderSlotsList();
    showToast('Окошко добавлено', 'success');
  });
  renderSlotsList();
}

function renderNotifsTab(content) {
  const list = loadNotifications();
  if (!list.length) { content.innerHTML = '<p style="color: var(--text-soft);">Пока нет уведомлений.</p>'; return; }
  content.innerHTML = `
    <p style="color: var(--text-soft); margin-bottom: 12px; font-size: 14px;">Всего: ${list.length}</p>
    <div class="notif-list">
      ${list.map(n => `<div class="notif-item ${!n.read ? 'notif-item--unread' : ''}"><div class="notif-item__text">${n.text}</div><div class="notif-item__time">${formatTimeAgo(n.time)}</div></div>`).join('')}
    </div>
    <button class="btn btn--ghost btn--full" id="clearNotifs" style="margin-top: 16px;">Очистить все</button>
  `;
  document.getElementById('clearNotifs')?.addEventListener('click', () => {
    if (!confirm('Очистить все уведомления?')) return;
    saveNotifications([]);
    renderAdminPanel();
    showToast('Уведомления очищены', 'success');
  });
}

function renderStatsTab(content) {
  let totalSlots = 0, bookedSlots = 0, freeSlots = 0;
  const bySpec = {};
  const byPsychologist = [];
  SPECIALISTS.forEach(s => {
    const slots = s.slots || [];
    totalSlots += slots.length;
    const booked = slots.filter(x => x.booked).length;
    bookedSlots += booked;
    freeSlots += slots.length - booked;
    bySpec[s.specName] = (bySpec[s.specName] || 0) + 1;
    byPsychologist.push({ name: s.name, booked, total: slots.length });
  });
  const maxSlots = Math.max(1, ...byPsychologist.map(p => p.total));
  const maxSpec = Math.max(1, ...Object.values(bySpec));
  content.innerHTML = `
    <p style="color: var(--text-soft); margin-bottom: 16px; font-size: 14px;">Общая статистика</p>
    <div class="stats-grid-admin">
      <div class="stat-card-admin"><div class="stat-card-admin__num">${SPECIALISTS.length}</div><div class="stat-card-admin__label">Психологов</div></div>
      <div class="stat-card-admin"><div class="stat-card-admin__num">${totalSlots}</div><div class="stat-card-admin__label">Всего окошек</div></div>
      <div class="stat-card-admin"><div class="stat-card-admin__num" style="color: var(--red);">${bookedSlots}</div><div class="stat-card-admin__label">Занято</div></div>
      <div class="stat-card-admin"><div class="stat-card-admin__num" style="color: var(--mint-dark);">${freeSlots}</div><div class="stat-card-admin__label">Свободно</div></div>
    </div>
    <h4 style="font-family: var(--font-heading); font-size: 16px; margin-bottom: 12px;">По специализациям</h4>
    <div class="chart-bars">
      ${Object.entries(bySpec).sort((a,b)=>b[1]-a[1]).map(([name,count]) => `
        <div class="chart-bar-row">
          <span class="chart-bar-row__label">${name}</span>
          <div class="chart-bar-row__track"><div class="chart-bar-row__fill" style="width: ${(count/maxSpec)*100}%"></div></div>
          <span class="chart-bar-row__value">${count}</span>
        </div>
      `).join('')}
    </div>
    <h4 style="font-family: var(--font-heading); font-size: 16px; margin: 24px 0 12px;">Записи по психологам</h4>
    <div class="chart-bars">
      ${byPsychologist.sort((a,b)=>b.booked-a.booked).map(p => `
        <div class="chart-bar-row">
          <span class="chart-bar-row__label">${p.name.split(' ')[0]}</span>
          <div class="chart-bar-row__track"><div class="chart-bar-row__fill" style="width: ${p.total > 0 ? (p.booked/maxSlots)*100 : 0}%"></div></div>
          <span class="chart-bar-row__value">${p.booked}/${p.total}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderBackupTab(content) {
  const backups = loadBackups();
  content.innerHTML = `
    <p style="color: var(--text-soft); margin-bottom: 16px; font-size: 14px;">Резервные копии. Хранится до 10.</p>
    <div class="backup-actions">
      <button class="btn btn--primary" id="createBackupBtn">💾 Создать копию</button>
      <button class="btn btn--ghost" id="exportJsonBtn">📤 Экспорт JSON</button>
      <button class="btn btn--ghost" id="importJsonBtn">📥 Импорт JSON</button>
    </div>
    <h4 style="font-family: var(--font-heading); font-size: 16px; margin-bottom: 12px;">История (${backups.length})</h4>
    <div>
      ${backups.length ? backups.map(b => `
        <div class="backup-item">
          <div class="backup-item__info">
            <div class="backup-item__date">${new Date(b.date).toLocaleString('ru-RU')}</div>
            <div class="backup-item__meta">Психологов: ${b.count}</div>
          </div>
          <div class="admin-item__actions">
            <button class="admin-item__btn" data-restore="${b.id}">↩️</button>
            <button class="admin-item__btn admin-item__btn--danger" data-delbackup="${b.id}">🗑️</button>
          </div>
        </div>
      `).join('') : '<p style="color: var(--text-soft);">Пусто.</p>'}
    </div>
    <input type="file" id="importFile" accept=".json" style="display: none;">
  `;
  document.getElementById('createBackupBtn')?.addEventListener('click', () => {
    const b = createBackup();
    renderBackupTab(content);
    showToast(`Копия создана (${b.count})`, 'success');
  });
  document.getElementById('exportJsonBtn')?.addEventListener('click', () => {
    const data = { specialists: loadSpecialists(), favorites: loadFavorites(), exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindspace-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Файл скачан', 'success');
  });
  document.getElementById('importJsonBtn')?.addEventListener('click', () => document.getElementById('importFile').click());
  document.getElementById('importFile')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.specialists || !Array.isArray(data.specialists)) throw new Error('Неверный формат');
        createBackup();
        saveSpecialists(data.specialists);
        SPECIALISTS = loadSpecialists();
        if (data.favorites) { saveFavorites(data.favorites); FAVORITES = loadFavorites(); updateFavCount(); }
        renderSpecialists(); renderAdminPanel();
        showToast(`Импортировано ${data.specialists.length}`, 'success');
      } catch (err) { showToast('Ошибка импорта: ' + err.message, 'error'); }
    };
    reader.readAsText(file);
  });
  content.querySelectorAll('[data-restore]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.restore);
      if (!confirm('Восстановить? Текущие данные заменятся.')) return;
      if (restoreBackup(id)) { renderSpecialists(); renderAdminPanel(); showToast('Восстановлено', 'success'); }
    });
  });
  content.querySelectorAll('[data-delbackup]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.delbackup);
      const list = loadBackups().filter(b => b.id !== id);
      saveBackups(list);
      renderBackupTab(content);
    });
  });
}

// ============ ИНИЦИАЛИЗАЦИЯ ============
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initBurger();
  initCookieBanner();
  initCounters();
  renderSpecialists();
  renderTests();
  renderMood();
  initReveal();
  initSmoothScroll();
  initFilters();
  initModalClose();
  initProgressBar();
  initScrollTop();
  initTheme();
  initMoodNav();
  initAdmin();
  initFavBtn();
  initBookingButtons();

  const lastBackup = localStorage.getItem('mindspace_last_backup');
  const today = new Date().toISOString().slice(0, 10);
  if (lastBackup !== today) {
    createBackup();
    localStorage.setItem('mindspace_last_backup', today);
  }
});