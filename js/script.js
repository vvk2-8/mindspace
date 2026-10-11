// список психологов. Пока просто массив в коде, потом можно
// вынести в базу данных, но для учебного проекта и так сойдёт
const DEFAULT_SPECIALISTS = [
  { id: 1, name: 'Анна Смирнова', initials: 'АС', color: '#A8D5BA', spec: 'anxiety', specName: 'Тревожность', experience: 8, price: 2500, rating: 4.9, reviews: 124,
    bio: 'Специализируюсь на работе с тревожными состояниями и паническими атаками.', education: 'МГУ им. М.В. Ломоносова, 2016', languages: 'Русский, английский', approach: 'КПТ, mindfulness',
    slots: [
      { date: '2026-10-15', time: '10:00', duration: 60, booked: false },
      { date: '2026-10-15', time: '14:00', duration: 60, booked: false },
      { date: '2026-10-16', time: '12:00', duration: 90, booked: true },
      { date: '2026-10-17', time: '16:00', duration: 60, booked: false }
    ]},
  { id: 2, name: 'Дмитрий Волков', initials: 'ДВ', color: '#B8A9D9', spec: 'depression', specName: 'Депрессия', experience: 12, price: 3500, rating: 5.0, reviews: 210,
    bio: 'Работаю с депрессивными состояниями, потерей смысла, кризисами.', education: 'СПбГУ, 2012', languages: 'Русский', approach: 'Психодинамическая терапия, ACT',
    slots: [
      { date: '2026-10-15', time: '11:00', duration: 60, booked: false },
      { date: '2026-10-16', time: '15:00', duration: 90, booked: false },
      { date: '2026-10-18', time: '10:00', duration: 60, booked: false }
    ]},
  { id: 3, name: 'Елена Кузнецова', initials: 'ЕК', color: '#F2C4A7', spec: 'relations', specName: 'Отношения', experience: 6, price: 2000, rating: 4.8, reviews: 89,
    bio: 'Помогаю парам и отдельным людям разбираться в отношениях.', education: 'РГГУ, 2018', languages: 'Русский', approach: 'Системная семейная терапия, ЭФТ',
    slots: [
      { date: '2026-10-15', time: '13:00', duration: 60, booked: false },
      { date: '2026-10-17', time: '18:00', duration: 60, booked: false }
    ]},
  { id: 4, name: 'Игорь Петров', initials: 'ИП', color: '#A8D5BA', spec: 'career', specName: 'Карьера', experience: 10, price: 3000, rating: 4.9, reviews: 156,
    bio: 'Карьерный консультант. Помогаю найти своё дело.', education: 'ВШЭ, 2014', languages: 'Русский, английский', approach: 'Коучинг, КПТ',
    slots: [
      { date: '2026-10-16', time: '11:00', duration: 60, booked: false },
      { date: '2026-10-18', time: '14:00', duration: 90, booked: false }
    ]},
  { id: 5, name: 'Мария Соколова', initials: 'МС', color: '#B8A9D9', spec: 'child', specName: 'Детская психология', experience: 7, price: 2800, rating: 5.0, reviews: 98,
    bio: 'Работаю с детьми от 4 до 16 лет и их родителями.', education: 'МПГУ, 2017', languages: 'Русский', approach: 'Игровая терапия, арт-терапия',
    slots: [
      { date: '2026-10-15', time: '16:00', duration: 60, booked: false },
      { date: '2026-10-17', time: '11:00', duration: 45, booked: false }
    ]},
  { id: 6, name: 'Ольга Новикова', initials: 'ОН', color: '#F2C4A7', spec: 'anxiety', specName: 'Тревожность', experience: 5, price: 1800, rating: 4.7, reviews: 67,
    bio: 'Помогаю справиться с тревогой, страхами и неуверенностью.', education: 'МГППУ, 2019', languages: 'Русский', approach: 'КПТ, телесно-ориентированная терапия',
    slots: [
      { date: '2026-10-16', time: '10:00', duration: 60, booked: false },
      { date: '2026-10-18', time: '17:00', duration: 60, booked: false }
    ]}
];

// сохранение и загрузка из localStorage.
// тут сначала не работало, оказалось надо JSON.stringify
function loadSpecialists() {
  var saved = localStorage.getItem('mindspace_specialists');
  if (saved) {
    try {
      var list = JSON.parse(saved);
      list.forEach(function (s) {
        var slots = s.slots || [];
        slots.forEach(function (slot) {
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

var SPECIALISTS = loadSpecialists();

// избранное
function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem('mindspace_favorites') || '[]');
  } catch (e) {
    return [];
  }
}

function saveFavorites(list) {
  localStorage.setItem('mindspace_favorites', JSON.stringify(list));
}

var FAVORITES = loadFavorites();

function toggleFavorite(id) {
  var idx = FAVORITES.indexOf(id);
  if (idx > -1) FAVORITES.splice(idx, 1);
  else FAVORITES.push(id);
  saveFavorites(FAVORITES);
  updateFavCount();
}

function updateFavCount() {
  var badge = document.getElementById('favCount');
  if (!badge) return;
  badge.textContent = FAVORITES.length;
  badge.classList.toggle('icon-btn__badge--hidden', FAVORITES.length === 0);
}

// вспомогательные функции для дат
function formatDate(dateStr) {
  var parts = dateStr.split('-');
  var months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  return Number(parts[2]) + ' ' + months[Number(parts[1]) - 1];
}

function formatDuration(min) {
  min = Number(min) || 60;
  if (min < 60) return min + ' мин';
  var h = Math.floor(min / 60);
  var m = min % 60;
  if (m === 0) return h + ' ч';
  return h + ' ч ' + m + ' мин';
}

function isFutureDate(y, m, d) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var cellDate = new Date(y, m, d);
  cellDate.setHours(0, 0, 0, 0);
  return cellDate.getTime() > today.getTime();
}

function isTodayDate(y, m, d) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var cellDate = new Date(y, m, d);
  cellDate.setHours(0, 0, 0, 0);
  return cellDate.getTime() === today.getTime();
}

// вход в админку
var ADMIN_LOGIN = 'admin';
var ADMIN_PASSWORD = 'admin123';

function isAdminLogged() {
  return localStorage.getItem('mindspace_admin') === 'true';
}

function setAdminLogged(value) {
  if (value) localStorage.setItem('mindspace_admin', 'true');
  else localStorage.removeItem('mindspace_admin');
}

// тесты
var TESTS = [
  { id: 'stress', icon: '01', title: 'Уровень стресса', desc: '5 вопросов · 2 минуты',
    questions: [
      { q: 'Как часто вы чувствуете напряжение?', answers: [{ text: 'Почти никогда', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Постоянно', score: 3 }] },
      { q: 'Как вы спите?', answers: [{ text: 'Отлично', score: 0 }, { text: 'Иногда плохо', score: 1 }, { text: 'Часто не могу уснуть', score: 2 }, { text: 'Бессонница', score: 3 }] },
      { q: 'Как быстро вы раздражаетесь?', answers: [{ text: 'Трудно вывести', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто по мелочам', score: 2 }, { text: 'Постоянно', score: 3 }] },
      { q: 'Успеваете ли вы отдыхать?', answers: [{ text: 'Да, регулярно', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Редко', score: 2 }, { text: 'Почти никогда', score: 3 }] },
      { q: 'Есть ли физические симптомы?', answers: [{ text: 'Нет', score: 0 }, { text: 'Редко', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Постоянно', score: 3 }] }
    ],
    results: [
      { max: 4, icon: '✓', title: 'Стресс под контролем', text: 'Вы хорошо справляетесь с нагрузкой.' },
      { max: 9, icon: '—', title: 'Умеренный стресс', text: 'Обратите внимание на отдых.' },
      { max: 20, icon: '!', title: 'Повышенный стресс', text: 'Рекомендуем консультацию психолога.' }
    ] },
  { id: 'anxiety', icon: '02', title: 'Шкала тревожности', desc: '5 вопросов · 2 минуты',
    questions: [
      { q: 'Часто ли вы волнуетесь без причины?', answers: [{ text: 'Нет', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Почти всегда', score: 3 }] },
      { q: 'Трудно ли вам расслабиться?', answers: [{ text: 'Нет', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Постоянно', score: 3 }] },
      { q: 'Бывают ли панические состояния?', answers: [{ text: 'Никогда', score: 0 }, { text: 'Один раз', score: 1 }, { text: 'Несколько раз', score: 2 }, { text: 'Регулярно', score: 3 }] },
      { q: 'Легко ли вам сосредоточиться?', answers: [{ text: 'Да', score: 0 }, { text: 'Обычно да', score: 1 }, { text: 'С трудом', score: 2 }, { text: 'Очень трудно', score: 3 }] },
      { q: 'Беспокоитесь в новой обстановке?', answers: [{ text: 'Нет', score: 0 }, { text: 'Немного', score: 1 }, { text: 'Сильно', score: 2 }, { text: 'Очень сильно', score: 3 }] }
    ],
    results: [
      { max: 4, icon: '✓', title: 'Низкая тревожность', text: 'Вы спокойны и уравновешены.' },
      { max: 9, icon: '—', title: 'Умеренная тревожность', text: 'Стоит обратить внимание на релаксацию.' },
      { max: 20, icon: '!', title: 'Высокая тревожность', text: 'Рекомендуем обратиться к психологу.' }
    ] },
  { id: 'burnout', icon: '03', title: 'Выгорание', desc: '5 вопросов · 2 минуты',
    questions: [
      { q: 'Устаёте уже утром?', answers: [{ text: 'Нет', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Каждый день', score: 3 }] },
      { q: 'Интересует ли вас работа?', answers: [{ text: 'Да, очень', score: 0 }, { text: 'Обычно да', score: 1 }, { text: 'Скорее нет', score: 2 }, { text: 'Совсем нет', score: 3 }] },
      { q: 'Истощены после рабочего дня?', answers: [{ text: 'Нет', score: 0 }, { text: 'Немного', score: 1 }, { text: 'Сильно', score: 2 }, { text: 'Очень сильно', score: 3 }] },
      { q: 'Снизилась продуктивность?', answers: [{ text: 'Нет', score: 0 }, { text: 'Немного', score: 1 }, { text: 'Заметно', score: 2 }, { text: 'Значительно', score: 3 }] },
      { q: 'Бывают эмоциональные срывы?', answers: [{ text: 'Нет', score: 0 }, { text: 'Редко', score: 1 }, { text: 'Иногда', score: 2 }, { text: 'Часто', score: 3 }] }
    ],
    results: [
      { max: 4, icon: '✓', title: 'Выгорания нет', text: 'Вы сохраняете баланс.' },
      { max: 9, icon: '—', title: 'Начальная стадия', text: 'Стоит задуматься об отдыхе.' },
      { max: 20, icon: '!', title: 'Высокое выгорание', text: 'Обратитесь к специалисту.' }
    ] }
];

// настроения для дневника
var MOODS = [
  { value: 1, num: '1', label: 'Плохо' },
  { value: 2, num: '2', label: 'Так себе' },
  { value: 3, num: '3', label: 'Нормально' },
  { value: 4, num: '4', label: 'Хорошо' },
  { value: 5, num: '5', label: 'Отлично' }
];

// всплывающие сообщения
function showToast(message, type, duration) {
  type = type || 'info';
  duration = duration || 3500;
  var container = document.getElementById('toastContainer');
  if (!container) return;
  var toast = document.createElement('div');
  toast.className = 'toast toast--' + type;
  var icons = { success: '✓', error: '!', info: 'ℹ' };
  toast.innerHTML = '<span class="toast__icon">' + (icons[type] || '') + '</span><span>' + message + '</span>';
  container.appendChild(toast);
  setTimeout(function () {
    toast.classList.add('toast--leaving');
    setTimeout(function () { toast.remove(); }, 300);
  }, duration);
}

// прелоадер
function initPreloader() {
  var preloader = document.getElementById('preloader');
  var fill = document.getElementById('preloaderFill');
  if (!preloader || !fill) return;
  var progress = 0;
  var interval = setInterval(function () {
    progress += Math.random() * 25 + 10;
    if (progress >= 100) {
      progress = 100;
      fill.style.width = '100%';
      clearInterval(interval);
      setTimeout(function () {
        preloader.classList.add('preloader--hidden');
      }, 300);
    } else {
      fill.style.width = progress + '%';
    }
  }, 150);
}

// кнопка меню для мобильных
function initBurger() {
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (!burger || !nav) return;
  burger.addEventListener('click', function () {
    burger.classList.toggle('burger--active');
    nav.classList.toggle('nav--open');
  });
  var links = nav.querySelectorAll('.nav__link');
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      burger.classList.remove('burger--active');
      nav.classList.remove('nav--open');
    });
  });
}

// cookies баннер
function initCookieBanner() {
  var banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (localStorage.getItem('mindspace_cookie') === 'accepted') return;
  setTimeout(function () {
    banner.classList.add('cookie-banner--visible');
  }, 2000);

  var acceptBtn = document.getElementById('cookieAccept');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem('mindspace_cookie', 'accepted');
      banner.classList.remove('cookie-banner--visible');
      showToast('Спасибо! Куки приняты.', 'success');
    });
  }

  var declineBtn = document.getElementById('cookieDecline');
  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      localStorage.setItem('mindspace_cookie', 'declined');
      banner.classList.remove('cookie-banner--visible');
    });
  }
}

// счётчики цифр
function initCounters() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  counters.forEach(function (el) {
    var target = Number(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var current = 0;
    var step = Math.ceil(target / 50);
    var interval = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current.toLocaleString('ru-RU') + suffix;
    }, 40);
  });
}

// карточки психологов
function renderSpecialists() {
  var grid = document.getElementById('specialistsGrid');
  if (!grid) return;
  SPECIALISTS = loadSpecialists();
  FAVORITES = loadFavorites();

  var filterSpec = '';
  var specEl = document.getElementById('filterSpec');
  if (specEl) filterSpec = specEl.value;

  var filterPrice = 0;
  var priceEl = document.getElementById('filterPrice');
  if (priceEl) filterPrice = Number(priceEl.value) || 0;

  var filterSearch = '';
  var searchEl = document.getElementById('filterSearch');
  if (searchEl) filterSearch = searchEl.value.toLowerCase().trim();

  var filtered = SPECIALISTS.filter(function (s) {
    if (filterSpec && s.spec !== filterSpec) return false;
    if (filterPrice && s.price > filterPrice) return false;
    if (filterSearch && s.name.toLowerCase().indexOf(filterSearch) === -1) return false;
    return true;
  });

  var emptyMsg = document.getElementById('emptyMessage');
  if (emptyMsg) emptyMsg.hidden = filtered.length > 0;

  var html = '';
  filtered.forEach(function (s) {
    var isFav = FAVORITES.indexOf(s.id) > -1;
    html += '<div class="card">';
    html += '<button class="card__fav ' + (isFav ? 'card__fav--active' : '') + '" data-fav="' + s.id + '">❤️</button>';
    html += '<div class="card__avatar" style="background: ' + s.color + ';">' + s.initials + '</div>';
    html += '<h3 class="card__name">' + s.name + '</h3>';
    html += '<p class="card__spec">' + s.specName + '</p>';
    html += '<div class="card__meta">';
    html += '<span>★ ' + s.rating + ' (' + s.reviews + ')</span>';
    html += '<span>Опыт: ' + s.experience + ' лет</span>';
    html += '</div>';
    html += '<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">';
    html += '<span style="font-size: 13px; color: var(--text-soft);">Сессия</span>';
    html += '<span class="card__price">' + s.price + ' ₽</span>';
    html += '</div>';
    html += '<button class="card__btn" data-open-profile="' + s.id + '">Подробнее</button>';
    html += '</div>';
  });
  grid.innerHTML = html;

  var openBtns = grid.querySelectorAll('[data-open-profile]');
  openBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = Number(btn.dataset.openProfile);
      var sp = null;
      for (var i = 0; i < SPECIALISTS.length; i++) {
        if (SPECIALISTS[i].id === id) sp = SPECIALISTS[i];
      }
      if (sp) openProfileModal(sp);
    });
  });

  var favBtns = grid.querySelectorAll('[data-fav]');
  favBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      var id = Number(btn.dataset.fav);
      toggleFavorite(id);
      renderSpecialists();
    });
  });
}

// окно избранного
function openFavoritesModal() {
  var modal = document.getElementById('modal');
  var body = document.getElementById('modalBody');
  if (!modal || !body) return;

  FAVORITES = loadFavorites();
  var favList = [];
  SPECIALISTS.forEach(function (s) {
    if (FAVORITES.indexOf(s.id) > -1) favList.push(s);
  });

  if (favList.length === 0) {
    body.innerHTML = '<h3 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: 8px;">Избранное</h3>' +
      '<p style="color: var(--text-soft); margin-bottom: 20px;">Вы пока не добавили ни одного психолога в избранное.</p>' +
      '<p style="font-size: 14px; color: var(--text-soft);">Нажмите ❤️ на карточке психолога, чтобы сохранить его здесь.</p>';
    modal.classList.add('modal--open');
    return;
  }

  var html = '<h3 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: 20px;">❤️ Избранное (' + favList.length + ')</h3>';
  html += '<div class="fav-list">';
  favList.forEach(function (s) {
    html += '<div class="fav-item">';
    html += '<div class="fav-item__avatar" style="background: ' + s.color + ';">' + s.initials + '</div>';
    html += '<div class="fav-item__info">';
    html += '<div class="fav-item__name">' + s.name + '</div>';
    html += '<div class="fav-item__meta">' + s.specName + ' · ' + s.price + ' ₽</div>';
    html += '</div>';
    html += '<button class="btn btn--primary btn--small" data-fav-open="' + s.id + '">Открыть</button>';
    html += '</div>';
  });
  html += '</div>';
  body.innerHTML = html;
  modal.classList.add('modal--open');

  var btns = body.querySelectorAll('[data-fav-open]');
  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = Number(btn.dataset.favOpen);
      var sp = null;
      for (var i = 0; i < SPECIALISTS.length; i++) {
        if (SPECIALISTS[i].id === id) sp = SPECIALISTS[i];
      }
      closeModal();
      if (sp) openProfileModal(sp);
    });
  });
}

// профиль психолога
function openProfileModal(sp) {
  var modal = document.getElementById('modal');
  var body = document.getElementById('modalBody');
  var win = document.getElementById('modalWindow');
  if (!modal || !body) return;
  win.classList.add('modal__window--wide');

  var bio = sp.bio ? sp.bio : 'Психолог с опытом работы.';
  var approach = sp.approach ? sp.approach : 'Индивидуальный';
  var languages = sp.languages ? sp.languages : 'Русский';
  var education = sp.education ? sp.education : 'Не указано';

  body.innerHTML = '<div class="profile-header">' +
    '<div class="profile-header__avatar" style="background: ' + sp.color + ';">' + sp.initials + '</div>' +
    '<div class="profile-header__info">' +
    '<div class="profile-header__name">' + sp.name + '</div>' +
    '<div class="profile-header__spec">' + sp.specName + ' · Опыт ' + sp.experience + ' лет</div>' +
    '<div style="margin-top: 8px; font-size: 14px; color: var(--text-soft);">★ ' + sp.rating + ' · ' + sp.reviews + ' отзывов · <strong style="color: var(--text);">' + sp.price + ' ₽</strong> за сессию</div>' +
    '</div></div>' +
    '<div class="profile-tabs" id="profileTabs">' +
    '<button class="profile-tab profile-tab--active" data-tab="bio">О себе</button>' +
    '<button class="profile-tab" data-tab="edu">Образование</button>' +
    '<button class="profile-tab" data-tab="slots">Расписание</button>' +
    '</div>' +
    '<div class="profile-content" id="profileContent"></div>';

  function renderTab(tab) {
    var content = document.getElementById('profileContent');
    if (tab === 'bio') {
      content.innerHTML = '<p>' + bio + '</p><p><strong>Подход:</strong> ' + approach + '</p><p><strong>Языки:</strong> ' + languages + '</p>';
    } else if (tab === 'edu') {
      content.innerHTML = '<p><strong>Образование:</strong></p><p>' + education + '</p>';
    } else if (tab === 'slots') {
      var slots = sp.slots || [];
      if (slots.length === 0) {
        content.innerHTML = '<p>Свободных окошек пока нет.</p>';
      } else {
        var h = '<p style="margin-bottom: 12px;">Выберите удобное время:</p><div class="slots-grid">';
        for (var i = 0; i < slots.length; i++) {
          var slot = slots[i];
          h += '<button class="slot ' + (slot.booked ? 'slot--booked' : '') + '" data-slot-index="' + i + '" ' + (slot.booked ? 'disabled' : '') + '>';
          h += formatDate(slot.date) + '<br>' + slot.time + '<br>';
          h += '<span style="font-size: 11px; opacity: 0.75;">' + formatDuration(slot.duration) + '</span>';
          h += '</button>';
        }
        h += '</div>';
        content.innerHTML = h;
        var slotBtns = content.querySelectorAll('.slot:not(.slot--booked)');
        slotBtns.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var idx = Number(btn.dataset.slotIndex);
            var slot = sp.slots[idx];
            closeModal();
            openBookingModal(sp, slot);
          });
        });
      }
    }
  }
  renderTab('bio');

  var tabs = document.querySelectorAll('#profileTabs .profile-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('#profileTabs .profile-tab').forEach(function (t) {
        t.classList.remove('profile-tab--active');
      });
      tab.classList.add('profile-tab--active');
      renderTab(tab.dataset.tab);
    });
  });

  modal.classList.add('modal--open');
}

function closeModal() {
  var modal = document.getElementById('modal');
  if (modal) modal.classList.remove('modal--open');
  var w = document.getElementById('modalWindow');
  if (w) w.classList.remove('modal__window--wide');
}

// запись на сессию (3 шага)
var bookingStep = 1;
var bookingData = { specialist: null, slot: null, name: '', email: '' };

function openBookingModal(sp, slot) {
  if (sp === null) {
    bookingStep = 1;
    bookingData = { specialist: null, slot: null, name: '', email: '' };
  } else if (!slot) {
    bookingStep = 2;
    bookingData = { specialist: sp, slot: null, name: '', email: '' };
  } else {
    bookingStep = 2;
    bookingData = { specialist: sp, slot: slot, name: '', email: '' };
  }
  renderBookingStep();
}

function renderBookingStep() {
  var modal = document.getElementById('modal');
  var body = document.getElementById('modalBody');
  if (!modal || !body) return;
  var sp = bookingData.specialist;
  modal.classList.add('modal--open');

  var stepsProgress = '<div class="booking-steps">' +
    '<div class="booking-steps__step ' + (bookingStep >= 1 ? 'booking-steps__step--active' : '') + '"></div>' +
    '<div class="booking-steps__step ' + (bookingStep >= 2 ? 'booking-steps__step--active' : '') + '"></div>' +
    '<div class="booking-steps__step ' + (bookingStep >= 3 ? 'booking-steps__step--active' : '') + '"></div>' +
    '</div>';

  if (bookingStep === 1) {
    var html1 = stepsProgress;
    html1 += '<h3 class="booking-step-title">Шаг 1. Выберите психолога</h3>';
    html1 += '<p class="booking-step-subtitle">Мы подберём свободные окошки</p>';
    html1 += '<div class="admin-list">';
    SPECIALISTS.forEach(function (s) {
      html1 += '<div class="admin-item">';
      html1 += '<div class="admin-item__info">';
      html1 += '<div class="admin-item__name">' + s.name + '</div>';
      html1 += '<div class="admin-item__meta">' + s.specName + ' · ' + s.price + ' ₽</div>';
      html1 += '</div>';
      html1 += '<button class="btn btn--primary btn--small" data-select-sp="' + s.id + '">Выбрать</button>';
      html1 += '</div>';
    });
    html1 += '</div>';
    body.innerHTML = html1;

    body.querySelectorAll('[data-select-sp]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = Number(btn.dataset.selectSp);
        for (var i = 0; i < SPECIALISTS.length; i++) {
          if (SPECIALISTS[i].id === id) bookingData.specialist = SPECIALISTS[i];
        }
        bookingStep = 2;
        renderBookingStep();
      });
    });
  } else if (bookingStep === 2) {
    var freeSlots = [];
    var slots = sp.slots || [];
    for (var i = 0; i < slots.length; i++) {
      if (!slots[i].booked) freeSlots.push(slots[i]);
    }
    var html2 = stepsProgress;
    html2 += '<h3 class="booking-step-title">Шаг 2. Выберите время</h3>';
    html2 += '<p class="booking-step-subtitle">' + sp.name + ' · ' + sp.specName + '</p>';
    if (freeSlots.length > 0) {
      html2 += '<div class="slots-grid" style="margin-bottom: 20px;">';
      for (var j = 0; j < freeSlots.length; j++) {
        var slot = freeSlots[j];
        var selected = bookingData.slot && bookingData.slot.date === slot.date && bookingData.slot.time === slot.time;
        html2 += '<button class="slot ' + (selected ? 'slot--selected' : '') + '" data-slot="' + j + '">';
        html2 += formatDate(slot.date) + '<br>' + slot.time + '<br>';
        html2 += '<span style="font-size: 11px; opacity: 0.75;">' + formatDuration(slot.duration) + '</span>';
        html2 += '</button>';
      }
      html2 += '</div>';
    } else {
      html2 += '<p style="color: var(--text-soft); margin-bottom: 20px;">Свободных окошек нет</p>';
    }
    html2 += '<div class="booking-buttons">';
    html2 += '<button class="btn btn--ghost" id="prevStep">← Назад</button>';
    html2 += '<button class="btn btn--primary" id="nextStep" ' + (freeSlots.length === 0 ? 'disabled' : '') + '>Далее →</button>';
    html2 += '</div>';
    body.innerHTML = html2;

    body.querySelectorAll('[data-slot]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        body.querySelectorAll('[data-slot]').forEach(function (b) {
          b.classList.remove('slot--selected');
        });
        btn.classList.add('slot--selected');
        bookingData.slot = freeSlots[Number(btn.dataset.slot)];
      });
    });

    document.getElementById('prevStep').addEventListener('click', function () {
      bookingStep = 1;
      renderBookingStep();
    });

    var nextBtn = document.getElementById('nextStep');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (!bookingData.slot) {
          showToast('Выберите время', 'error');
          return;
        }
        bookingStep = 3;
        renderBookingStep();
      });
    }
  } else {
    var html3 = stepsProgress;
    html3 += '<h3 class="booking-step-title">Шаг 3. Ваши контакты</h3>';
    html3 += '<p class="booking-step-subtitle">Куда прислать подтверждение?</p>';
    html3 += '<div class="form-field"><label class="form-field__label">Имя</label>';
    html3 += '<input type="text" id="bookName" class="form-field__input" placeholder="Иван" value="' + bookingData.name + '">';
    html3 += '<p class="form-field__error" id="errorName"></p></div>';
    html3 += '<div class="form-field"><label class="form-field__label">Email</label>';
    html3 += '<input type="email" id="bookEmail" class="form-field__input" placeholder="ivan@example.com" value="' + bookingData.email + '">';
    html3 += '<p class="form-field__error" id="errorEmail"></p></div>';
    html3 += '<div class="booking-summary"><div>';
    html3 += '<div style="font-size: 12px; color: var(--text-soft);">Сессия</div>';
    html3 += '<div style="font-weight: 700;">' + sp.name + '</div>';
    html3 += '<div style="font-size: 13px; color: var(--text-soft);">' + formatDate(bookingData.slot.date) + ', ' + bookingData.slot.time + ' · ' + formatDuration(bookingData.slot.duration) + '</div>';
    html3 += '</div>';
    html3 += '<strong>' + sp.price + ' ₽</strong>';
    html3 += '</div>';
    html3 += '<div class="booking-buttons">';
    html3 += '<button class="btn btn--ghost" id="prevStep">← Назад</button>';
    html3 += '<button class="btn btn--primary" id="confirmBtn">Подтвердить</button>';
    html3 += '</div>';
    body.innerHTML = html3;

    document.getElementById('prevStep').addEventListener('click', function () {
      bookingStep = 2;
      renderBookingStep();
    });

    document.getElementById('confirmBtn').addEventListener('click', function () {
      var name = document.getElementById('bookName').value.trim();
      var email = document.getElementById('bookEmail').value.trim();
      var errName = document.getElementById('errorName');
      var errEmail = document.getElementById('errorEmail');
      var ok = true;

      if (name.length < 2) {
        errName.textContent = 'Минимум 2 символа';
        ok = false;
      } else {
        errName.textContent = '';
      }

      if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        errEmail.textContent = 'Некорректный email';
        ok = false;
      } else {
        errEmail.textContent = '';
      }

      if (!ok) return;

      var all = loadSpecialists();
      for (var i = 0; i < all.length; i++) {
        if (all[i].id === sp.id) {
          for (var k = 0; k < all[i].slots.length; k++) {
            var s = all[i].slots[k];
            if (s.date === bookingData.slot.date && s.time === bookingData.slot.time) {
              s.booked = true;
            }
          }
        }
      }
      saveSpecialists(all);
      SPECIALISTS = all;
      renderSpecialists();
      showToast('Заявка отправлена, ' + name + '!', 'success');
      closeModal();
    });
  }
}

// тесты
var currentTest = null;
var currentStep = 0;
var answers = [];
var selectedAnswer = null;

function renderTests() {
  var grid = document.getElementById('testsGrid');
  if (!grid) return;
  var html = '';
  TESTS.forEach(function (t) {
    html += '<div class="test-card">';
    html += '<div class="test-card__icon">' + t.icon + '</div>';
    html += '<h3 class="test-card__title">' + t.title + '</h3>';
    html += '<p class="test-card__desc">' + t.desc + '</p>';
    html += '<button class="btn btn--primary" data-test="' + t.id + '" style="margin-top: auto;">Пройти тест</button>';
    html += '</div>';
  });
  grid.innerHTML = html;

  grid.querySelectorAll('[data-test]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.dataset.test;
      var test = null;
      for (var i = 0; i < TESTS.length; i++) {
        if (TESTS[i].id === id) test = TESTS[i];
      }
      if (test) {
        currentTest = test;
        currentStep = 0;
        answers = [];
        selectedAnswer = null;
        renderTestStep();
      }
    });
  });
}

function renderTestStep() {
  var modal = document.getElementById('modal');
  var body = document.getElementById('modalBody');
  if (!modal || !body) return;
  var q = currentTest.questions[currentStep];
  var total = currentTest.questions.length;

  var html = '<h3 style="font-family: var(--font-heading); font-size: 22px; margin-bottom: 6px;">' + currentTest.title + '</h3>';
  html += '<p style="color: var(--text-soft); margin-bottom: 24px; font-size: 14px;">Вопрос ' + (currentStep + 1) + ' из ' + total + '</p>';
  html += '<div class="progress-bar"><div class="progress-bar__fill" style="width: ' + ((currentStep / total) * 100) + '%"></div></div>';
  html += '<div class="test-question">';
  html += '<p class="test-question__text">' + q.q + '</p>';
  html += '<div class="test-answers">';
  for (var i = 0; i < q.answers.length; i++) {
    html += '<button class="test-answer" data-i="' + i + '">' + q.answers[i].text + '</button>';
  }
  html += '</div></div>';
  body.innerHTML = html;
  modal.classList.add('modal--open');

  body.querySelectorAll('.test-answer').forEach(function (btn) {
    btn.addEventListener('click', function () {
      body.querySelectorAll('.test-answer').forEach(function (b) {
        b.classList.remove('test-answer--selected');
      });
      btn.classList.add('test-answer--selected');
      selectedAnswer = Number(btn.dataset.i);
      setTimeout(function () {
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
  var body = document.getElementById('modalBody');
  if (!body) return;
  var total = 0;
  for (var i = 0; i < answers.length; i++) total += answers[i];

  var result = currentTest.results[currentTest.results.length - 1];
  for (var j = 0; j < currentTest.results.length; j++) {
    if (total <= currentTest.results[j].max) {
      result = currentTest.results[j];
      break;
    }
  }

  body.innerHTML = '<div class="test-result">' +
    '<div class="test-result__icon">' + result.icon + '</div>' +
    '<h3 class="test-result__title">' + result.title + '</h3>' +
    '<p class="test-result__text">' + result.text + '</p>' +
    '<p style="color: var(--text-soft); margin-bottom: 24px; font-size: 14px;">Ваш балл: ' + total + '</p>' +
    '<button class="btn btn--primary" id="closeTestResult">Понятно</button>' +
    '</div>';

  document.getElementById('closeTestResult').addEventListener('click', closeModal);
}

// дневник настроения
var moodDate = new Date();
var moodData = JSON.parse(localStorage.getItem('mindspace_mood') || '{}');

function moodKey(y, m, d) {
  var mm = m + 1;
  var mmStr = mm < 10 ? '0' + mm : '' + mm;
  var ddStr = d < 10 ? '0' + d : '' + d;
  return y + '-' + mmStr + '-' + ddStr;
}

function renderMood() {
  var grid = document.getElementById('moodGrid');
  if (!grid) return;
  var y = moodDate.getFullYear();
  var m = moodDate.getMonth();
  var monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  document.getElementById('currentMonth').textContent = monthNames[m] + ' ' + y;

  var firstDay = new Date(y, m, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  var daysInMonth = new Date(y, m + 1, 0).getDate();

  var html = '';
  for (var i = 0; i < firstDay; i++) {
    html += '<div class="mood-day mood-day--empty"></div>';
  }

  for (var d = 1; d <= daysInMonth; d++) {
    var key = moodKey(y, m, d);
    var mood = moodData[key];
    var future = isFutureDate(y, m, d);
    var today = isTodayDate(y, m, d);

    var cls = 'mood-day';
    if (mood && !future) cls += ' mood-day--' + mood;
    if (today) cls += ' mood-day--today';
    if (future) cls += ' mood-day--future';

    html += '<div class="' + cls + '" data-key="' + key + '" data-day="' + d + '" data-future="' + future + '">' + d + '</div>';
  }
  grid.innerHTML = html;

  grid.querySelectorAll('.mood-day[data-key]').forEach(function (el) {
    if (el.dataset.future === 'true') return;
    el.addEventListener('click', function () {
      openMoodPicker(el.dataset.key, el.dataset.day);
    });
  });

  renderMoodChart();
  renderMoodSummary();
}

function openMoodPicker(key, day) {
  var modal = document.getElementById('modal');
  var body = document.getElementById('modalBody');
  if (!modal || !body) return;
  var parts = key.split('-');
  var picked = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  picked.setHours(0, 0, 0, 0);
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  if (picked.getTime() > today.getTime()) return;

  var current = moodData[key];
  var html = '<h3 style="font-family: var(--font-heading); font-size: 22px; margin-bottom: 6px;">Как ваше настроение?</h3>';
  html += '<p style="color: var(--text-soft); margin-bottom: 24px; font-size: 14px;">День ' + day + '</p>';
  html += '<div style="display: flex; gap: 8px; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap;">';
  MOODS.forEach(function (m) {
    var bg = current === m.value ? 'var(--mint)' : 'var(--bg-gray)';
    var border = current === m.value ? 'var(--mint-dark)' : 'transparent';
    html += '<button class="mood-btn" data-value="' + m.value + '" style="flex: 1 1 calc(20% - 8px); min-width: 60px; padding: 12px 6px; border-radius: 10px; background: ' + bg + '; border: 2px solid ' + border + '; display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; font-family: inherit;">';
    html += '<span style="font-family: var(--font-heading); font-size: 20px; font-weight: 800;">' + m.num + '</span>';
    html += '<span style="font-size: 11px; font-weight: 600; text-align: center;">' + m.label + '</span>';
    html += '</button>';
  });
  html += '</div>';
  if (current) {
    html += '<button id="removeMood" style="width: 100%; padding: 12px; color: var(--red); font-weight: 600; font-size: 14px; cursor: pointer;">Удалить отметку</button>';
  }
  body.innerHTML = html;
  modal.classList.add('modal--open');

  body.querySelectorAll('.mood-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      moodData[key] = Number(btn.dataset.value);
      localStorage.setItem('mindspace_mood', JSON.stringify(moodData));
      closeModal();
      renderMood();
      showToast('Настроение сохранено', 'success', 2000);
    });
  });

  var removeBtn = document.getElementById('removeMood');
  if (removeBtn) {
    removeBtn.addEventListener('click', function () {
      delete moodData[key];
      localStorage.setItem('mindspace_mood', JSON.stringify(moodData));
      closeModal();
      renderMood();
    });
  }
}

// график настроения. тут пришлось повозиться, но вроде работает
function renderMoodChart() {
  var canvas = document.getElementById('moodChart');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var rect = canvas.getBoundingClientRect();
  var w = rect.width;
  var h = rect.height;
  canvas.width = w;
  canvas.height = h;
  var pad = 30;
  ctx.clearRect(0, 0, w, h);

  var y = moodDate.getFullYear();
  var m = moodDate.getMonth();
  var daysInMonth = new Date(y, m + 1, 0).getDate();
  var points = [];
  for (var d = 1; d <= daysInMonth; d++) {
    if (isFutureDate(y, m, d)) points.push(null);
    else points.push(moodData[moodKey(y, m, d)] || null);
  }

  var hasData = false;
  for (var i = 0; i < points.length; i++) {
    if (points[i] !== null) hasData = true;
  }

  if (!hasData) {
    ctx.fillStyle = '#A89E92';
    ctx.font = '14px Manrope, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Отметьте настроение, чтобы увидеть график', w / 2, h / 2);
    return;
  }

  var stepX = (w - 2 * pad) / (daysInMonth - 1);
  var scaleY = (h - 2 * pad) / 5;

  ctx.beginPath();
  var started = false;
  for (var i = 0; i < points.length; i++) {
    if (points[i] === null) continue;
    var x = pad + stepX * i;
    var yy = h - pad - points[i] * scaleY;
    if (!started) {
      ctx.moveTo(x, yy);
      started = true;
    } else {
      ctx.lineTo(x, yy);
    }
  }
  ctx.strokeStyle = '#A8D5BA';
  ctx.lineWidth = 3;
  ctx.stroke();

  for (var i = 0; i < points.length; i++) {
    if (points[i] === null) continue;
    var x = pad + stepX * i;
    var yy = h - pad - points[i] * scaleY;
    ctx.beginPath();
    ctx.arc(x, yy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#A8D5BA';
    ctx.fill();
  }
}

function renderMoodSummary() {
  var y = moodDate.getFullYear();
  var m = moodDate.getMonth();
  var daysInMonth = new Date(y, m + 1, 0).getDate();
  var values = [];
  var bestDay = null;
  var bestValue = 0;

  for (var d = 1; d <= daysInMonth; d++) {
    if (isFutureDate(y, m, d)) continue;
    var v = moodData[moodKey(y, m, d)];
    if (v) {
      values.push(v);
      if (v > bestValue) {
        bestValue = v;
        bestDay = d;
      }
    }
  }

  var sum = 0;
  for (var i = 0; i < values.length; i++) sum += values[i];
  var avg = values.length > 0 ? (sum / values.length).toFixed(1) : '—';

  var avgEl = document.getElementById('moodAvg');
  if (avgEl) avgEl.textContent = avg;
  document.getElementById('moodBest').textContent = bestDay ? bestDay : '—';
  document.getElementById('moodCount').textContent = values.length;
}

// появление блоков при скролле
function initReveal() {
  var targets = document.querySelectorAll('.section, .step, .card, .test-card, .stat');
  if (!targets.length) return;

  targets.forEach(function (el) {
    el.classList.add('reveal');
  });

  function check() {
    targets.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('reveal--visible');
      }
    });
  }
  check();
  window.addEventListener('scroll', check);
}

// плавная прокрутка
function initSmoothScroll() {
  document.querySelectorAll('[data-scroll]').forEach(function (el) {
    el.addEventListener('click', function () {
      var target = document.getElementById(el.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// фильтры
function initFilters() {
  var ids = ['filterSpec', 'filterPrice', 'filterSearch'];
  ids.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', renderSpecialists);
      el.addEventListener('change', renderSpecialists);
    }
  });
}

// закрытие модалки
function initModalClose() {
  document.querySelectorAll('[data-close="true"]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
      var panel = document.getElementById('adminPanel');
      if (panel) panel.classList.remove('admin-panel--open');
    }
  });
}

// прогресс-бар вверху
function initProgressBar() {
  var bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var percent = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = percent + '%';
  });
}

// кнопка наверх
function initScrollTop() {
  var btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) btn.classList.add('scroll-top--visible');
    else btn.classList.remove('scroll-top--visible');
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// тёмная тема
function initTheme() {
  var btn = document.getElementById('themeBtn');
  if (!btn) return;
  var isDark = localStorage.getItem('mindspace_theme') === 'dark';

  function apply() {
    if (isDark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    btn.textContent = isDark ? '☀️' : '🌙';
  }
  apply();

  btn.addEventListener('click', function () {
    isDark = !isDark;
    localStorage.setItem('mindspace_theme', isDark ? 'dark' : 'light');
    apply();
  });
}

// переключение месяцев
function initMoodNav() {
  var prevBtn = document.getElementById('prevMonth');
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      moodDate.setMonth(moodDate.getMonth() - 1);
      renderMood();
    });
  }
  var nextBtn = document.getElementById('nextMonth');
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      moodDate.setMonth(moodDate.getMonth() + 1);
      renderMood();
    });
  }
  window.addEventListener('resize', renderMoodChart);
}

// кнопки записи
function initBookingButtons() {
  var btn1 = document.getElementById('bookingBtn');
  if (btn1) {
    btn1.addEventListener('click', function () {
      openBookingModal(null, null);
    });
  }
  var btn2 = document.getElementById('bookingBtnCta');
  if (btn2) {
    btn2.addEventListener('click', function () {
      openBookingModal(null, null);
    });
  }
}

// админка
function initAdmin() {
  var loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function () {
      if (isAdminLogged()) openAdminPanel();
      else openLoginModal();
    });
  }
  var closeBtn = document.getElementById('adminClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      document.getElementById('adminPanel').classList.remove('admin-panel--open');
    });
  }
  var logoutBtn = document.getElementById('adminLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      setAdminLogged(false);
      document.getElementById('adminPanel').classList.remove('admin-panel--open');
      updateLoginBtn();
      showToast('Вы вышли из админки', 'info');
    });
  }
  updateLoginBtn();
}

function updateLoginBtn() {
  var btn = document.getElementById('loginBtn');
  if (!btn) return;
  btn.textContent = isAdminLogged() ? '👤 Админка' : 'Войти';
}

function initFavBtn() {
  var btn = document.getElementById('favBtn');
  if (!btn) return;
  btn.addEventListener('click', openFavoritesModal);
  updateFavCount();
}

function openLoginModal() {
  var modal = document.getElementById('modal');
  var body = document.getElementById('modalBody');
  if (!modal || !body) return;
  body.innerHTML = '<h3 style="font-family: var(--font-heading); font-size: 26px; margin-bottom: 8px;">Вход для администратора</h3>' +
    '<p style="color: var(--text-soft); margin-bottom: 24px; font-size: 14px;">Введите логин и пароль</p>' +
    '<div class="form-field"><label class="form-field__label">Логин</label>' +
    '<input type="text" id="loginName" class="form-field__input" placeholder="admin"></div>' +
    '<div class="form-field"><label class="form-field__label">Пароль</label>' +
    '<input type="password" id="loginPass" class="form-field__input" placeholder="•••••••">' +
    '<p class="form-field__error" id="loginError"></p></div>' +
    '<button class="btn btn--primary btn--full" id="loginSubmit" style="margin-top: 8px;">Войти</button>' +
    '<p style="text-align: center; font-size: 12px; color: var(--text-soft); margin-top: 16px;">Демо-доступ: admin / admin123</p>';
  modal.classList.add('modal--open');

  function submit() {
    var name = document.getElementById('loginName').value.trim();
    var pass = document.getElementById('loginPass').value.trim();
    var err = document.getElementById('loginError');
    if (name === ADMIN_LOGIN && pass === ADMIN_PASSWORD) {
      setAdminLogged(true);
      updateLoginBtn();
      closeModal();
      openAdminPanel();
      showToast('Добро пожаловать, администратор!', 'success');
    } else {
      err.textContent = 'Неверный логин или пароль';
    }
  }

  document.getElementById('loginSubmit').addEventListener('click', submit);
  document.getElementById('loginPass').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') submit();
  });
}

// панель админа
var adminTab = 'list';
var editingSpecialistId = null;

function openAdminPanel() {
  var panel = document.getElementById('adminPanel');
  if (!panel) return;
  panel.classList.add('admin-panel--open');
  renderAdminPanel();
}

function renderAdminPanel() {
  var body = document.getElementById('adminPanelBody');
  if (!body) return;

  var addLabel = editingSpecialistId ? 'Ред.' : '+ Добавить';
  var html = '<div class="admin-tabs">';
  html += '<button class="admin-tab ' + (adminTab === 'list' ? 'admin-tab--active' : '') + '" data-tab="list">Психологи</button>';
  html += '<button class="admin-tab ' + (adminTab === 'add' ? 'admin-tab--active' : '') + '" data-tab="add">' + addLabel + '</button>';
  html += '<button class="admin-tab ' + (adminTab === 'slots' ? 'admin-tab--active' : '') + '" data-tab="slots">Окошки</button>';
  html += '</div><div id="adminContent"></div>';
  body.innerHTML = html;

  body.querySelectorAll('.admin-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      adminTab = tab.dataset.tab;
      if (adminTab !== 'add') editingSpecialistId = null;
      renderAdminPanel();
    });
  });

  var content = document.getElementById('adminContent');
  if (!content) return;

  if (adminTab === 'list') {
    var listHtml = '<div class="admin-list">';
    SPECIALISTS.forEach(function (s) {
      var slotsCount = (s.slots || []).length;
      listHtml += '<div class="admin-item">';
      listHtml += '<div class="admin-item__info">';
      listHtml += '<div class="admin-item__name">' + s.name + '</div>';
      listHtml += '<div class="admin-item__meta">' + s.specName + ' · ' + s.price + ' ₽ · слотов: ' + slotsCount + '</div>';
      listHtml += '</div>';
      listHtml += '<div class="admin-item__actions">';
      listHtml += '<button class="admin-item__btn" data-edit="' + s.id + '" title="Редактировать">✏️</button>';
      listHtml += '<button class="admin-item__btn admin-item__btn--danger" data-del="' + s.id + '" title="Удалить">🗑️</button>';
      listHtml += '</div></div>';
    });
    listHtml += '</div>';
    content.innerHTML = listHtml;

    content.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        editingSpecialistId = Number(btn.dataset.edit);
        adminTab = 'add';
        renderAdminPanel();
      });
    });

    content.querySelectorAll('[data-del]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = Number(btn.dataset.del);
        if (!confirm('Удалить психолога?')) return;
        var newList = [];
        SPECIALISTS.forEach(function (x) {
          if (x.id !== id) newList.push(x);
        });
        SPECIALISTS = newList;
        saveSpecialists(SPECIALISTS);

        var newFav = [];
        FAVORITES.forEach(function (fid) {
          if (fid !== id) newFav.push(fid);
        });
        FAVORITES = newFav;
        saveFavorites(FAVORITES);

        renderSpecialists();
        renderAdminPanel();
        showToast('Психолог удалён', 'success');
      });
    });
  } else if (adminTab === 'add') {
    renderAddForm(content);
  } else if (adminTab === 'slots') {
    renderSlotsTab(content);
  }
}

function renderAddForm(content) {
  var editing = null;
  if (editingSpecialistId) {
    for (var i = 0; i < SPECIALISTS.length; i++) {
      if (SPECIALISTS[i].id === editingSpecialistId) editing = SPECIALISTS[i];
    }
  }

  var nameVal = editing ? editing.name : '';
  var initialsVal = editing ? editing.initials : '';
  var colorVal = editing ? editing.color : '#A8D5BA';
  var specVal = editing ? editing.spec : 'anxiety';
  var expVal = editing ? editing.experience : 5;
  var priceVal = editing ? editing.price : 2500;
  var bioVal = editing ? editing.bio : '';
  var eduVal = editing ? editing.education : '';
  var langVal = editing ? editing.languages : 'Русский';
  var approachVal = editing ? editing.approach : '';

  var html = '<div class="form-field"><label class="form-field__label">ФИО *</label><input type="text" id="fName" class="form-field__input" value="' + nameVal + '" placeholder="Иван Иванов"></div>';
  html += '<div class="form-field"><label class="form-field__label">Инициалы (2 буквы)</label><input type="text" id="fInitials" class="form-field__input" maxlength="2" value="' + initialsVal + '" placeholder="ИИ"></div>';

  html += '<div class="form-field"><label class="form-field__label">Цвет аватара</label><select id="fColor" class="form-field__select">';
  html += '<option value="#A8D5BA" ' + (colorVal === '#A8D5BA' ? 'selected' : '') + '>Мята</option>';
  html += '<option value="#B8A9D9" ' + (colorVal === '#B8A9D9' ? 'selected' : '') + '>Лаванда</option>';
  html += '<option value="#F2C4A7" ' + (colorVal === '#F2C4A7' ? 'selected' : '') + '>Персик</option>';
  html += '<option value="#7BC47F" ' + (colorVal === '#7BC47F' ? 'selected' : '') + '>Зелёный</option>';
  html += '</select></div>';

  html += '<div class="form-field"><label class="form-field__label">Специализация *</label><select id="fSpec" class="form-field__select">';
  html += '<option value="anxiety" ' + (specVal === 'anxiety' ? 'selected' : '') + '>Тревожность</option>';
  html += '<option value="depression" ' + (specVal === 'depression' ? 'selected' : '') + '>Депрессия</option>';
  html += '<option value="relations" ' + (specVal === 'relations' ? 'selected' : '') + '>Отношения</option>';
  html += '<option value="career" ' + (specVal === 'career' ? 'selected' : '') + '>Карьера</option>';
  html += '<option value="child" ' + (specVal === 'child' ? 'selected' : '') + '>Детская психология</option>';
  html += '</select></div>';

  html += '<div class="form-field"><label class="form-field__label">Опыт (лет)</label><input type="number" id="fExp" class="form-field__input" value="' + expVal + '" min="1" max="40"></div>';
  html += '<div class="form-field"><label class="form-field__label">Цена (₽ за сессию)</label><input type="number" id="fPrice" class="form-field__input" value="' + priceVal + '" min="500" step="100"></div>';
  html += '<div class="form-field"><label class="form-field__label">О себе</label><textarea id="fBio" class="form-field__textarea" placeholder="Коротко о подходе и опыте">' + bioVal + '</textarea></div>';
  html += '<div class="form-field"><label class="form-field__label">Образование</label><input type="text" id="fEdu" class="form-field__input" value="' + eduVal + '" placeholder="МГУ, 2016"></div>';
  html += '<div class="form-field"><label class="form-field__label">Языки</label><input type="text" id="fLang" class="form-field__input" value="' + langVal + '" placeholder="Русский, английский"></div>';
  html += '<div class="form-field"><label class="form-field__label">Подход</label><input type="text" id="fApproach" class="form-field__input" value="' + approachVal + '" placeholder="КПТ, ACT"></div>';
  html += '<button class="btn btn--primary btn--full" id="saveSpecialist" style="margin-top: 8px;">' + (editing ? 'Сохранить' : 'Добавить') + '</button>';
  content.innerHTML = html;

  document.getElementById('saveSpecialist').addEventListener('click', function () {
    var name = document.getElementById('fName').value.trim();
    var initials = document.getElementById('fInitials').value.trim();
    if (!initials) {
      var words = name.split(' ');
      initials = '';
      for (var i = 0; i < words.length && i < 2; i++) {
        if (words[i][0]) initials += words[i][0].toUpperCase();
      }
    }
    var color = document.getElementById('fColor').value;
    var specVal = document.getElementById('fSpec').value;
    var specLabels = { anxiety: 'Тревожность', depression: 'Депрессия', relations: 'Отношения', career: 'Карьера', child: 'Детская психология' };
    var exp = Number(document.getElementById('fExp').value) || 5;
    var price = Number(document.getElementById('fPrice').value) || 2500;
    var bio = document.getElementById('fBio').value.trim();
    var education = document.getElementById('fEdu').value.trim();
    var languages = document.getElementById('fLang').value.trim();
    var approach = document.getElementById('fApproach').value.trim();

    if (name.length < 3) {
      showToast('Введите ФИО', 'error');
      return;
    }

    if (editing) {
      for (var i = 0; i < SPECIALISTS.length; i++) {
        if (SPECIALISTS[i].id === editing.id) {
          SPECIALISTS[i].name = name;
          SPECIALISTS[i].initials = initials;
          SPECIALISTS[i].color = color;
          SPECIALISTS[i].spec = specVal;
          SPECIALISTS[i].specName = specLabels[specVal];
          SPECIALISTS[i].experience = exp;
          SPECIALISTS[i].price = price;
          SPECIALISTS[i].bio = bio;
          SPECIALISTS[i].education = education;
          SPECIALISTS[i].languages = languages;
          SPECIALISTS[i].approach = approach;
        }
      }
      showToast('Изменения сохранены', 'success');
    } else {
      var maxId = 0;
      for (var i = 0; i < SPECIALISTS.length; i++) {
        if (SPECIALISTS[i].id > maxId) maxId = SPECIALISTS[i].id;
      }
      SPECIALISTS.push({
        id: maxId + 1,
        name: name,
        initials: initials,
        color: color,
        spec: specVal,
        specName: specLabels[specVal],
        experience: exp,
        price: price,
        rating: 5.0,
        reviews: 0,
        bio: bio,
        education: education,
        languages: languages,
        approach: approach,
        slots: []
      });
      showToast('Психолог добавлен', 'success');
    }

    saveSpecialists(SPECIALISTS);
    renderSpecialists();
    editingSpecialistId = null;
    adminTab = 'list';
    renderAdminPanel();
  });
}

function renderSlotsTab(content) {
  var optionsHtml = '';
  SPECIALISTS.forEach(function (s) {
    optionsHtml += '<option value="' + s.id + '">' + s.name + '</option>';
  });

  var html = '<p style="color: var(--text-soft); margin-bottom: 16px; font-size: 14px;">Выберите психолога и добавьте окошки.</p>';
  html += '<div class="form-field"><label class="form-field__label">Психолог</label><select id="slotSpec" class="form-field__select">' + optionsHtml + '</select></div>';
  html += '<div class="form-field"><label class="form-field__label">Дата</label><input type="date" id="slotDate" class="form-field__input"></div>';
  html += '<div class="form-field"><label class="form-field__label">Время начала</label><input type="time" id="slotTime" class="form-field__input" value="12:00"></div>';
  html += '<div class="form-field"><label class="form-field__label">Длительность</label><select id="slotDuration" class="form-field__select">';
  html += '<option value="30">30 минут</option>';
  html += '<option value="45">45 минут</option>';
  html += '<option value="60" selected>60 минут (1 час)</option>';
  html += '<option value="90">90 минут (1.5 часа)</option>';
  html += '<option value="120">120 минут (2 часа)</option>';
  html += '</select></div>';
  html += '<button class="btn btn--primary btn--full" id="addSlot" style="margin-bottom: 24px;">+ Добавить окошко</button>';
  html += '<div id="slotsList"></div>';
  content.innerHTML = html;

  function renderSlotsList() {
    var spId = Number(document.getElementById('slotSpec').value);
    var sp = null;
    for (var i = 0; i < SPECIALISTS.length; i++) {
      if (SPECIALISTS[i].id === spId) sp = SPECIALISTS[i];
    }
    var list = document.getElementById('slotsList');
    if (!sp || !list) return;
    var slots = sp.slots || [];

    if (slots.length === 0) {
      list.innerHTML = '<p style="color: var(--text-soft);">Пока нет окошек.</p>';
      return;
    }

    var h = '<p style="font-weight: 600; margin-bottom: 12px;">Окошки ' + sp.name + ':</p><div class="admin-list">';
    for (var j = 0; j < slots.length; j++) {
      var slot = slots[j];
      h += '<div class="admin-item">';
      h += '<div class="admin-item__info">';
      h += '<div class="admin-item__name">' + formatDate(slot.date) + ' · ' + slot.time + ' · ' + formatDuration(slot.duration) + '</div>';
      h += '<div class="admin-item__meta">' + (slot.booked ? '🔒 занято' : '🔓 свободно') + '</div>';
      h += '</div>';
      h += '<div class="admin-item__actions">';
      h += '<button class="admin-item__btn" data-toggleslot="' + j + '">' + (slot.booked ? '🔒' : '🔓') + '</button>';
      h += '<button class="admin-item__btn admin-item__btn--danger" data-delslot="' + j + '">🗑️</button>';
      h += '</div></div>';
    }
    h += '</div>';
    list.innerHTML = h;

    list.querySelectorAll('[data-toggleslot]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = Number(btn.dataset.toggleslot);
        var all = loadSpecialists();
        for (var i = 0; i < all.length; i++) {
          if (all[i].id === spId && all[i].slots[idx]) {
            all[i].slots[idx].booked = !all[i].slots[idx].booked;
            saveSpecialists(all);
            SPECIALISTS = all;
            renderSpecialists();
            renderSlotsList();
            showToast(all[i].slots[idx].booked ? 'Закрыто' : 'Открыто', 'success');
          }
        }
      });
    });

    list.querySelectorAll('[data-delslot]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = Number(btn.dataset.delslot);
        var all = loadSpecialists();
        for (var i = 0; i < all.length; i++) {
          if (all[i].id === spId) {
            all[i].slots.splice(idx, 1);
            saveSpecialists(all);
            SPECIALISTS = all;
            renderSpecialists();
            renderSlotsList();
            showToast('Окошко удалено', 'success');
          }
        }
      });
    });
  }

  document.getElementById('slotSpec').addEventListener('change', renderSlotsList);

  document.getElementById('addSlot').addEventListener('click', function () {
    var spId = Number(document.getElementById('slotSpec').value);
    var date = document.getElementById('slotDate').value;
    var time = document.getElementById('slotTime').value;
    var duration = Number(document.getElementById('slotDuration').value) || 60;

    if (!date || !time) {
      showToast('Укажите дату и время', 'error');
      return;
    }

    var all = loadSpecialists();
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === spId) {
        if (!all[i].slots) all[i].slots = [];
        all[i].slots.push({ date: date, time: time, duration: duration, booked: false });
        all[i].slots.sort(function (a, b) {
          var ka = a.date + a.time;
          var kb = b.date + b.time;
          if (ka < kb) return -1;
          if (ka > kb) return 1;
          return 0;
        });
        saveSpecialists(all);
        SPECIALISTS = all;
      }
    }
    renderSpecialists();
    renderSlotsList();
    showToast('Окошко добавлено', 'success');
  });

  renderSlotsList();
}

// запуск всего при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
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
});

// TODO: хотела ещё сделать сортировку психологов по рейтингу,
// но не успела до дедлайна. Может быть позже добавлю.
//
// console.log('Все функции запустились');
