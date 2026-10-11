// ============ ДАННЫЕ ============
const SPECIALISTS = [
  { id: 1, name: 'Анна Смирнова', initials: 'АС', color: '#F04E23', spec: 'anxiety', specName: 'Тревожность', experience: 8, price: 2500, rating: 4.9, reviews: 124 },
  { id: 2, name: 'Дмитрий Волков', initials: 'ДВ', color: '#1C4B3C', spec: 'depression', specName: 'Депрессия', experience: 12, price: 3500, rating: 5.0, reviews: 210 },
  { id: 3, name: 'Елена Кузнецова', initials: 'ЕК', color: '#8B6F5C', spec: 'relations', specName: 'Отношения', experience: 6, price: 2000, rating: 4.8, reviews: 89 },
  { id: 4, name: 'Игорь Петров', initials: 'ИП', color: '#C13A16', spec: 'career', specName: 'Карьера', experience: 10, price: 3000, rating: 4.9, reviews: 156 },
  { id: 5, name: 'Мария Соколова', initials: 'МС', color: '#4A7B5C', spec: 'child', specName: 'Детская психология', experience: 7, price: 2800, rating: 5.0, reviews: 98 },
  { id: 6, name: 'Ольга Новикова', initials: 'ОН', color: '#D4A574', spec: 'anxiety', specName: 'Тревожность', experience: 5, price: 1800, rating: 4.7, reviews: 67 },
];

const TESTS = [
  {
    id: 'stress', icon: '01', title: 'Уровень стресса', desc: '5 вопросов · 2 минуты',
    questions: [
      { q: 'Как часто вы чувствуете напряжение?', answers: [
        { text: 'Почти никогда', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Постоянно', score: 3 } ]},
      { q: 'Как вы спите?', answers: [
        { text: 'Отлично', score: 0 }, { text: 'Иногда плохо', score: 1 }, { text: 'Часто не могу уснуть', score: 2 }, { text: 'Бессонница', score: 3 } ]},
      { q: 'Как быстро вы раздражаетесь?', answers: [
        { text: 'Трудно вывести', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто по мелочам', score: 2 }, { text: 'Постоянно', score: 3 } ]},
      { q: 'Успеваете ли вы отдыхать?', answers: [
        { text: 'Да, регулярно', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Редко', score: 2 }, { text: 'Почти никогда', score: 3 } ]},
      { q: 'Есть ли физические симптомы?', answers: [
        { text: 'Нет', score: 0 }, { text: 'Редко', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Постоянно', score: 3 } ]},
    ],
    results: [
      { max: 4, icon: '✓', title: 'Стресс под контролем', text: 'Вы хорошо справляетесь с нагрузкой.' },
      { max: 9, icon: '—', title: 'Умеренный стресс', text: 'Обратите внимание на отдых и практики релаксации.' },
      { max: 20, icon: '!', title: 'Повышенный стресс', text: 'Рекомендуем консультацию психолога.' },
    ],
  },
  {
    id: 'anxiety', icon: '02', title: 'Шкала тревожности', desc: '5 вопросов · 2 минуты',
    questions: [
      { q: 'Часто ли вы волнуетесь без причины?', answers: [
        { text: 'Нет', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Почти всегда', score: 3 } ]},
      { q: 'Трудно ли вам расслабиться?', answers: [
        { text: 'Нет', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Постоянно', score: 3 } ]},
      { q: 'Бывают ли панические состояния?', answers: [
        { text: 'Никогда', score: 0 }, { text: 'Один раз', score: 1 }, { text: 'Несколько раз', score: 2 }, { text: 'Регулярно', score: 3 } ]},
      { q: 'Легко ли вам сосредоточиться?', answers: [
        { text: 'Да', score: 0 }, { text: 'Обычно да', score: 1 }, { text: 'С трудом', score: 2 }, { text: 'Очень трудно', score: 3 } ]},
      { q: 'Беспокоитесь в новой обстановке?', answers: [
        { text: 'Нет', score: 0 }, { text: 'Немного', score: 1 }, { text: 'Сильно', score: 2 }, { text: 'Очень сильно', score: 3 } ]},
    ],
    results: [
      { max: 4, icon: '✓', title: 'Низкая тревожность', text: 'Вы спокойны и уравновешены.' },
      { max: 9, icon: '—', title: 'Умеренная тревожность', text: 'Стоит обратить внимание на релаксацию.' },
      { max: 20, icon: '!', title: 'Высокая тревожность', text: 'Рекомендуем обратиться к психологу.' },
    ],
  },
  {
    id: 'burnout', icon: '03', title: 'Выгорание', desc: '5 вопросов · 2 минуты',
    questions: [
      { q: 'Устаёте уже утром?', answers: [
        { text: 'Нет', score: 0 }, { text: 'Иногда', score: 1 }, { text: 'Часто', score: 2 }, { text: 'Каждый день', score: 3 } ]},
      { q: 'Интересует ли вас работа?', answers: [
        { text: 'Да, очень', score: 0 }, { text: 'Обычно да', score: 1 }, { text: 'Скорее нет', score: 2 }, { text: 'Совсем нет', score: 3 } ]},
      { q: 'Истощены после рабочего дня?', answers: [
        { text: 'Нет', score: 0 }, { text: 'Немного', score: 1 }, { text: 'Сильно', score: 2 }, { text: 'Очень сильно', score: 3 } ]},
      { q: 'Снизилась продуктивность?', answers: [
        { text: 'Нет', score: 0 }, { text: 'Немного', score: 1 }, { text: 'Заметно', score: 2 }, { text: 'Значительно', score: 3 } ]},
      { q: 'Бывают эмоциональные срывы?', answers: [
        { text: 'Нет', score: 0 }, { text: 'Редко', score: 1 }, { text: 'Иногда', score: 2 }, { text: 'Часто', score: 3 } ]},
    ],
    results: [
      { max: 4, icon: '✓', title: 'Выгорания нет', text: 'Вы сохраняете баланс.' },
      { max: 9, icon: '—', title: 'Начальная стадия', text: 'Стоит задуматься об отдыхе.' },
      { max: 20, icon: '!', title: 'Высокое выгорание', text: 'Обязательно обратитесь к специалисту.' },
    ],
  },
];

const MOODS = [
  { value: 1, num: '1', label: 'Плохо' },
  { value: 2, num: '2', label: 'Так себе' },
  { value: 3, num: '3', label: 'Нормально' },
  { value: 4, num: '4', label: 'Хорошо' },
  { value: 5, num: '5', label: 'Отлично' },
];

const REVIEWS = [
  { text: 'Долго не решалась обратиться к психологу. Первая сессия прошла спокойно — меня не торопили, помогли сформулировать запрос.', name: 'Мария К.', role: 'студентка', initials: 'МК', color: '#F04E23' },
  { text: 'Удобно, что всё онлайн и анонимно. Дневник настроения стал ежедневной привычкой.', name: 'Иван П.', role: 'IT-специалист', initials: 'ИП', color: '#1C4B3C' },
  { text: 'Помогли разобраться с выгоранием. После трёх сессий почувствовал разницу.', name: 'Алексей С.', role: 'маркетолог', initials: 'АС', color: '#8B6F5C' },
  { text: 'Цены адекватные, психологи профессиональные. Отдельное спасибо за тесты.', name: 'Екатерина В.', role: 'дизайнер', initials: 'ЕВ', color: '#C13A16' },
  { text: 'Работаю с тревожностью уже 2 месяца. Прогресс есть, спокойнее реагирую на стресс.', name: 'Дмитрий Н.', role: 'предприниматель', initials: 'ДН', color: '#4A7B5C' },
  { text: 'Обращалась по поводу отношений. Получила поддержку без осуждения и конкретные техники.', name: 'Ольга М.', role: 'учитель', initials: 'ОМ', color: '#D4A574' },
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
    } else {
      fill.style.width = progress + '%';
    }
  }, 150);
}

// ============ NAVBAR SCROLL ============
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 20);
  });
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
    showToast('Хорошо, куки отклонены.', 'info');
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
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ============ СПЕЦИАЛИСТЫ ============
function renderSpecialists() {
  const grid = document.getElementById('specialistsGrid');
  if (!grid) return;

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

  grid.innerHTML = filtered.map(s => `
    <div class="card">
      <div class="card__avatar" style="background: ${s.color};">${s.initials}</div>
      <h3 class="card__name">${s.name}</h3>
      <p class="card__spec">${s.specName}</p>
      <div class="card__meta">
        <span>Рейтинг: ${s.rating} (${s.reviews})</span>
        <span>Опыт: ${s.experience} лет</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
        <span style="font-size: 13px; color: var(--muted); font-weight: 500;">Сессия</span>
        <span class="card__price">${s.price} ₽</span>
      </div>
      <button class="card__btn" data-book="${s.id}">Записаться</button>
    </div>
  `).join('');

  grid.querySelectorAll('[data-book]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sp = SPECIALISTS.find(x => x.id === Number(btn.dataset.book));
      if (sp) openBookingModal(sp);
    });
  });
}

// ============ БРОНИРОВАНИЕ ============
let bookingStep = 1;
let bookingData = { specialist: null, name: '', email: '', date: '', time: '' };

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('modal--open');
}

function openBookingModal(sp) {
  bookingStep = 1;
  bookingData = { specialist: sp, name: '', email: '', date: '', time: '' };
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
      <h3 class="booking-step-title">Шаг 1. Ваше имя</h3>
      <p class="booking-step-subtitle">Как к вам обращаться?</p>
      <form class="booking-form" id="stepForm">
        <div class="form-field">
          <label class="form-field__label" for="bookName">Имя</label>
          <input type="text" id="bookName" class="form-field__input" placeholder="Иван" value="${bookingData.name}">
          <p class="form-field__error" id="errorName"></p>
        </div>
        <div class="form-field">
          <label class="form-field__label" for="bookEmail">Email</label>
          <input type="email" id="bookEmail" class="form-field__input" placeholder="ivan@example.com" value="${bookingData.email}">
          <p class="form-field__error" id="errorEmail"></p>
        </div>
        <button type="submit" class="btn btn--primary" style="width: 100%; margin-top: 8px;">Далее →</button>
      </form>
    `;

    document.getElementById('stepForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName').value.trim();
      const email = document.getElementById('bookEmail').value.trim();
      const errName = document.getElementById('errorName');
      const errEmail = document.getElementById('errorEmail');
      let ok = true;
      if (name.length < 2) { errName.textContent = 'Минимум 2 символа'; ok = false; }
      else errName.textContent = '';
      if (!email.includes('@') || !email.includes('.')) { errEmail.textContent = 'Некорректный email'; ok = false; }
      else errEmail.textContent = '';
      if (!ok) return;
      bookingData.name = name;
      bookingData.email = email;
      bookingStep = 2;
      renderBookingStep();
    });
  } else if (bookingStep === 2) {
    body.innerHTML = `
      ${stepsProgress}
      <h3 class="booking-step-title">Шаг 2. Дата и время</h3>
      <p class="booking-step-subtitle">Когда вам удобно?</p>
      <form class="booking-form" id="stepForm">
        <div class="form-field">
          <label class="form-field__label" for="bookDate">Дата</label>
          <input type="date" id="bookDate" class="form-field__input" value="${bookingData.date}">
          <p class="form-field__error" id="errorDate"></p>
        </div>
        <div class="form-field">
          <label class="form-field__label" for="bookTime">Время</label>
          <select id="bookTime" class="form-field__input">
            <option value="">Выберите время</option>
            <option value="10:00" ${bookingData.time === '10:00' ? 'selected' : ''}>10:00</option>
            <option value="12:00" ${bookingData.time === '12:00' ? 'selected' : ''}>12:00</option>
            <option value="14:00" ${bookingData.time === '14:00' ? 'selected' : ''}>14:00</option>
            <option value="16:00" ${bookingData.time === '16:00' ? 'selected' : ''}>16:00</option>
            <option value="18:00" ${bookingData.time === '18:00' ? 'selected' : ''}>18:00</option>
            <option value="20:00" ${bookingData.time === '20:00' ? 'selected' : ''}>20:00</option>
          </select>
          <p class="form-field__error" id="errorTime"></p>
        </div>
        <div class="booking-buttons">
          <button type="button" class="btn btn--ghost" id="prevStep">← Назад</button>
          <button type="submit" class="btn btn--primary">Далее →</button>
        </div>
      </form>
    `;

    document.getElementById('prevStep').addEventListener('click', () => {
      bookingStep = 1;
      renderBookingStep();
    });
    document.getElementById('stepForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('bookDate').value;
      const time = document.getElementById('bookTime').value;
      const errDate = document.getElementById('errorDate');
      const errTime = document.getElementById('errorTime');
      let ok = true;
      if (!date) { errDate.textContent = 'Выберите дату'; ok = false; } else errDate.textContent = '';
      if (!time) { errTime.textContent = 'Выберите время'; ok = false; } else errTime.textContent = '';
      if (!ok) return;
      bookingData.date = date;
      bookingData.time = time;
      bookingStep = 3;
      renderBookingStep();
    });
  } else {
    body.innerHTML = `
      ${stepsProgress}
      <h3 class="booking-step-title">Шаг 3. Подтверждение</h3>
      <p class="booking-step-subtitle">Проверьте данные</p>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="padding: 16px; background: var(--bg); border-radius: 8px; border: 2px solid var(--ink);">
          <div style="font-size: 12px; color: var(--muted); text-transform: uppercase; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 4px;">Психолог</div>
          <div style="font-weight: 700; font-size: 16px;">${sp.name} · ${sp.specName}</div>
        </div>
        <div style="padding: 16px; background: var(--bg); border-radius: 8px; border: 2px solid var(--ink);">
          <div style="font-size: 12px; color: var(--muted); text-transform: uppercase; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 4px;">Контакты</div>
          <div style="font-weight: 700; font-size: 16px;">${bookingData.name} · ${bookingData.email}</div>
        </div>
        <div style="padding: 16px; background: var(--bg); border-radius: 8px; border: 2px solid var(--ink);">
          <div style="font-size: 12px; color: var(--muted); text-transform: uppercase; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 4px;">Когда</div>
          <div style="font-weight: 700; font-size: 16px;">${bookingData.date} в ${bookingData.time}</div>
        </div>
        <div class="booking-summary">
          <span style="font-weight: 600;">К оплате</span>
          <strong>${sp.price} ₽</strong>
        </div>
        <div class="booking-buttons">
          <button class="btn btn--ghost" id="prevStep">← Назад</button>
          <button class="btn btn--primary" id="confirmBtn">Подтвердить</button>
        </div>
      </div>
    `;

    document.getElementById('prevStep').addEventListener('click', () => {
      bookingStep = 2;
      renderBookingStep();
    });
    document.getElementById('confirmBtn').addEventListener('click', () => {
      showToast(`Заявка отправлена, ${bookingData.name}!`, 'success');
      closeModal();
    });
  }
}

// ============ ТЕСТЫ ============
let currentTest = null;
let currentStep = 0;
let answers = [];
let selectedAnswer = null;

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
  const modal = document.getElementById('modal');
  const body = document.getElementById('modalBody');
  if (!modal || !body) return;
  const q = currentTest.questions[currentStep];
  const total = currentTest.questions.length;

  body.innerHTML = `
    <h3 style="font-family: var(--font-heading); font-size: 24px; margin-bottom: 6px; letter-spacing: -0.03em; font-weight: 700;">${currentTest.title}</h3>
    <p style="color: var(--muted); margin-bottom: 24px; font-size: 14px; font-weight: 500;">Вопрос ${currentStep + 1} из ${total}</p>
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
      <p style="color: var(--muted); margin-bottom: 24px; font-size: 14px; font-weight: 500;">Ваш балл: ${total}</p>
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

  const y = moodDate.getFullYear();
  const m = moodDate.getMonth();
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  document.getElementById('currentMonth').textContent = `${monthNames[m]} ${y}`;

  let firstDay = new Date(y, m, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let html = '';
  for (let i = 0; i < firstDay; i++) html += `<div class="mood-day mood-day--empty"></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const key = moodKey(y, m, d);
    const mood = moodData[key];

    const cellDate = new Date(y, m, d);
    cellDate.setHours(0, 0, 0, 0);

    const isFuture = cellDate.getTime() > today.getTime();
    const isToday = cellDate.getTime() === today.getTime();

    const cls = ['mood-day'];
    if (mood) cls.push(`mood-day--${mood}`);
    if (isToday) cls.push('mood-day--today');
    if (isFuture) cls.push('mood-day--future');

    html += `<div class="${cls.join(' ')}" data-key="${key}" data-day="${d}" data-future="${isFuture}">${d}</div>`;
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (picked.getTime() > today.getTime()) {
    showToast('Нельзя отмечать будущие дни', 'error');
    return;
  }

  const current = moodData[key];

  body.innerHTML = `
    <h3 style="font-family: var(--font-heading); font-size: 26px; margin-bottom: 6px; letter-spacing: -0.03em; font-weight: 700;">Как ваше настроение?</h3>
    <p style="color: var(--muted); margin-bottom: 28px; font-size: 14px; font-weight: 500;">День ${day}</p>
    <div style="display: flex; gap: 10px; justify-content: space-between; margin-bottom: 24px;">
      ${MOODS.map(m => `
        <button class="mood-btn" data-value="${m.value}" style="
          flex: 1; padding: 16px 8px; border-radius: 8px;
          background: ${current === m.value ? 'var(--coral)' : 'var(--bg)'};
          color: ${current === m.value ? 'var(--white)' : 'var(--ink)'};
          border: 2px solid ${current === m.value ? 'var(--coral)' : 'var(--ink)'};
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          cursor: pointer; transition: all 0.15s; font-family: inherit;
        ">
          <span style="font-family: var(--font-heading); font-size: 24px; font-weight: 800; line-height: 1; letter-spacing: -0.03em;">${m.num}</span>
          <span style="font-size: 12px; font-weight: 600;">${m.label}</span>
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
      closeModal();
      renderMood();
      showToast('Настроение сохранено', 'success', 2000);
    });
  });

  const removeBtn = document.getElementById('removeMood');
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      delete moodData[key];
      localStorage.setItem('mindspace_mood', JSON.stringify(moodData));
      closeModal();
      renderMood();
    });
  }
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

  const y = moodDate.getFullYear();
  const m = moodDate.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const points = [];
  for (let d = 1; d <= daysInMonth; d++) points.push(moodData[moodKey(y, m, d)] || null);

  ctx.strokeStyle = 'rgba(20, 18, 16, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const yy = pad + (h - 2 * pad) * (i / 5);
    ctx.beginPath(); ctx.moveTo(pad, yy); ctx.lineTo(w - pad, yy); ctx.stroke();
  }

  const hasData = points.some(p => p !== null);
  if (!hasData) {
    ctx.fillStyle = '#7A7068';
    ctx.font = '14px Inter, sans-serif';
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
  ctx.strokeStyle = '#F04E23';
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();

  points.forEach((v, i) => {
    if (v === null) return;
    const x = pad + stepX * i;
    const yy = h - pad - v * scaleY;
    ctx.beginPath();
    ctx.arc(x, yy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#F04E23';
    ctx.fill();
    ctx.strokeStyle = '#FBF3E4';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

function renderMoodSummary() {
  const y = moodDate.getFullYear();
  const m = moodDate.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const values = [];
  let bestDay = null, bestValue = 0;

  for (let d = 1; d <= daysInMonth; d++) {
    const v = moodData[moodKey(y, m, d)];
    if (v) { values.push(v); if (v > bestValue) { bestValue = v; bestDay = d; } }
  }

  const avgEl = document.getElementById('moodAvg');
  if (avgEl) {
    if (values.length) avgEl.textContent = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
    else avgEl.textContent = '—';
  }
  document.getElementById('moodBest').textContent = bestDay ? bestDay : '—';
  document.getElementById('moodCount').textContent = values.length;
}

// ============ ОТЗЫВЫ ============
let currentReview = 0;
let reviewsPerView = 3;

function renderReviews() {
  const track = document.getElementById('reviewsTrack');
  const dots = document.getElementById('reviewsDots');
  if (!track) return;

  reviewsPerView = window.innerWidth < 900 ? 1 : 3;

  track.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-card__stars">★★★★★</div>
      <p class="review-card__text">«${r.text}»</p>
      <div class="review-card__author">
        <div class="review-card__avatar" style="background: ${r.color};">${r.initials}</div>
        <div>
          <div class="review-card__name">${r.name}</div>
          <div class="review-card__role">${r.role}</div>
        </div>
      </div>
    </div>
  `).join('');

  const totalPages = Math.max(1, REVIEWS.length - reviewsPerView + 1);
  dots.innerHTML = Array.from({ length: totalPages }, (_, i) =>
    `<div class="reviews-dots__dot ${i === currentReview ? 'reviews-dots__dot--active' : ''}" data-i="${i}"></div>`
  ).join('');

  updateReviewsTransform();

  dots.querySelectorAll('.reviews-dots__dot').forEach(dot => {
    dot.addEventListener('click', () => {
      currentReview = Number(dot.dataset.i);
      updateReviewsTransform();
      updateReviewsDots();
    });
  });
}

function updateReviewsTransform() {
  const track = document.getElementById('reviewsTrack');
  if (!track) return;
  const cardWidth = track.querySelector('.review-card')?.offsetWidth || 0;
  track.style.transform = `translateX(-${currentReview * (cardWidth + 24)}px)`;
}

function updateReviewsDots() {
  document.querySelectorAll('.reviews-dots__dot').forEach((d, i) => {
    d.classList.toggle('reviews-dots__dot--active', i === currentReview);
  });
}

// ============ АНИМАЦИЯ ============
function initReveal() {
  const targets = document.querySelectorAll('.section, .step, .card, .test-card, .review-card, .stat');
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

// ============ МОДАЛКА ============
function initModalClose() {
  document.querySelectorAll('[data-close="true"]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
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
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
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
    showToast(isDark ? 'Тёмная тема включена' : 'Светлая тема включена', 'info', 2000);
  });
}

// ============ УВЕДОМЛЕНИЯ ============
function initNotifications() {
  const btn = document.getElementById('notifBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    showToast('Новая акция: −50% на первую сессию', 'info', 4000);
    setTimeout(() => showToast('3 новых психолога в базе', 'info', 4000), 800);
  });
}

// ============ ПОДПИСКА ============
function initSubscribe() {
  const form = document.getElementById('subscribeForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('subscribeEmail').value.trim();
    if (!email.includes('@') || !email.includes('.')) {
      showToast('Введите корректный email', 'error');
      return;
    }
    showToast('Спасибо! Проверьте почту.', 'success');
    form.reset();
  });
}

// ============ НАВИГАЦИЯ ДНЕВНИКА ============
function initMoodNav() {
  document.getElementById('prevMonth')?.addEventListener('click', () => {
    moodDate.setMonth(moodDate.getMonth() - 1);
    renderMood();
  });
  document.getElementById('nextMonth')?.addEventListener('click', () => {
    moodDate.setMonth(moodDate.getMonth() + 1);
    renderMood();
  });
  window.addEventListener('resize', renderMoodChart);
}

// ============ НАВИГАЦИЯ ОТЗЫВОВ ============
function initReviewsNav() {
  document.getElementById('prevReview')?.addEventListener('click', () => {
    if (currentReview > 0) {
      currentReview--;
      updateReviewsTransform();
      updateReviewsDots();
    }
  });
  document.getElementById('nextReview')?.addEventListener('click', () => {
    const max = Math.max(0, REVIEWS.length - reviewsPerView);
    if (currentReview < max) {
      currentReview++;
      updateReviewsTransform();
      updateReviewsDots();
    }
  });
  window.addEventListener('resize', renderReviews);
}

// ============ ИНИЦИАЛИЗАЦИЯ ============
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbarScroll();
  initBurger();
  initCookieBanner();
  initCounters();
  renderSpecialists();
  renderTests();
  renderMood();
  renderReviews();
  initReveal();
  initSmoothScroll();
  initFilters();
  initModalClose();
  initProgressBar();
  initScrollTop();
  initTheme();
  initNotifications();
  initSubscribe();
  initMoodNav();
  initReviewsNav();
});