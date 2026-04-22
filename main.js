const translations = {
    ru: {
        title: 'Мои проекты',
        category_web: '🌐 Веб проекты',
        category_npm: '📦 NPM библиотеки',
        category_bots: '🤖 Боты',
        category_games: '🎯 Игры',
        category_api: '📡 API Swagger',
        shop: '🛍️ Магазин',
        sport_nutrition: '💪 Спортивное питание',
        gym_crm: '🏋️ Gym CRM',
        admin: '🧭 Админ панель магазина',
        cv: '💼 Резюме',
        interactive_cv: '💈Интерактивное резюме',
        congratulations: '🎉 Поздравления',
        bot_for_congratulations: '🎉 Бот для поздравлений',
        quotes_bot: '💬 Золотые цитаты',
        shop_bot: '🛒 Бот магазина',
        magic_player: '🎵 Magic Player',
        wedding: '💍 Свадебные приглашения',
        frontend_grade: '📊 Frontend Grade',
        colleagues: '👥 Коллеги на работе',
        repairs_accounting: '🧾 Repairs Accounting',
        chalysh_ui_title: '🧩 Chalysh UI',
        chalysh_ui_package: '🛍️ Пакет',
        chalysh_ui_demo: '🪧 Демо',
        promo_forge: '🚀 Генератор промо кодов',
        threejs: '🎮 Dream Team (Three.js)',
        chess_statistics: '♟️ Статистика шахматных партий',
        world_and_my_way: '🌍 Мир и мой путь',
        encryptor:"📇 Шифратор",
        space_shooter: '🚀 Space Shooter',
        promo_forge_swagger: '📚 Генератор промо кодов API',
        chess_statistics_swagger: '📚 Статистика шахматных партий API',
        gold_quotes_swagger: '📚 Бот "Золотые цитаты" API',
        auth_swagger: '📚 Сервис авторизации API',
        footer: '© 2026 DiCh — Все права защищены.',
    },
    en: {
        title: 'My Projects',
        category_web: '🌐 Web Projects',
        category_npm: '📦 NPM Libraries',
        category_bots: '🤖 Bots',
        category_games: '🎯 Games',
        category_api: '📡 API Swagger',
        shop: '🛍️ Dich Shop',
        sport_nutrition: '💪 Sport Nutrition',
        gym_crm: '🏋️ Gym CRM',
        admin: '🧭 Admin Panel DiCh Shop',
        cv: '💼 CV',
        interactive_cv: '💈Interactive CV',
        congratulations: '🎉 Congratulations',
        bot_for_congratulations: '🎉 Congratulations',
        quotes_bot: '💬 Golden Quotes',
        shop_bot: '🛒 Shop Bot',
        magic_player: '🎵 Magic Player',
        wedding: '💍 Wedding invitations',
        frontend_grade: '📊 Frontend Grade',
        colleagues: '👥 Colleagues at work',
        repairs_accounting: '🧾 Repairs Accounting',
        chalysh_ui_title: '🧩 Chalysh UI',
        chalysh_ui_package: '📦 Package',
        chalysh_ui_demo: '🎨 Demo',
        promo_forge: '🚀 Promo Forge',
        threejs: '🎮 Dream Team (Three.js)',
        chess_statistics: '♟️ Chess statistics',
        world_and_my_way: '🌍 World and My Way',
        encryptor:"📇 Encryptor",
        space_shooter: '🚀 Space Shooter',
        promo_forge_swagger: '📚 Promo Forge API',
        chess_statistics_swagger: '📚 Chess statistics API',
        gold_quotes_swagger: '📚 Bot "Gold quotes" API',
        auth_swagger: '📚 Authorization service API',
        footer: '© 2026 DiCh — All rights reserved.',
    }
};

function switchLanguage(lang) {
    // Сохраняем выбор языка
    localStorage.setItem('language', lang);

    // Обновляем атрибут lang у html
    document.documentElement.lang = lang;

    // Обновляем активную кнопку
    document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');

    // Обновляем все тексты
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'A') {
                // Для ссылок обновляем только текст, сохраняя span с путем
                const span = element.querySelector('span');
                const path = span ? span.textContent : '';
                element.innerHTML = translations[lang][key] + (span ? ` <span>${path}</span>` : '');
            } else if (element.tagName === 'H3' || element.classList.contains('library-group-title')) {
                // Для заголовков категорий и библиотек
                element.textContent = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Определяем язык браузера
function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage || 'ru';
    // Проверяем, начинается ли язык с 'en' (en, en-US, en-GB и т.д.)
    return lang.toLowerCase().startsWith('en') ? 'en' : 'ru';
}

// Определяем тему системы
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// Переключаем тему
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const systemTheme = getSystemTheme();

    let newTheme;
    if (!currentTheme) {
        // Если тема не установлена, используем противоположную системной
        newTheme = systemTheme === 'light' ? 'dark' : 'light';
    } else {
        // Переключаем между light и dark
        newTheme = currentTheme === 'light' ? 'dark' : 'light';
    }

    setTheme(newTheme);
}

// Устанавливаем тему
function setTheme(theme) {
    if (theme === 'auto' || !theme) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Обновляем иконку кнопки
    updateThemeIcon();
}

// Обновляем иконку темы
function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const systemTheme = getSystemTheme();
    const activeTheme = currentTheme || systemTheme;

    themeToggle.textContent = activeTheme === 'light' ? '🌙' : '☀️';
}

// Загружаем сохраненный язык и тему при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || getBrowserLanguage();
    switchLanguage(savedLang);

    // Загружаем сохраненную тему или используем системную
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Не устанавливаем data-theme, чтобы использовалась системная тема
        updateThemeIcon();
    }

    // --- Анимация при скролле ---
    const animatedElements = document.querySelectorAll('h2, h1, .category-title, .category-links > a, .library-group');
    animatedElements.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                delay += 75; // Задержка для эффекта лесенки при одновременном появлении
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

    animatedElements.forEach((el) => observer.observe(el));
});

// Слушаем изменения системной темы
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    // Обновляем иконку только если тема не установлена вручную
    if (!document.documentElement.getAttribute('data-theme')) {
        updateThemeIcon();
    }
});
