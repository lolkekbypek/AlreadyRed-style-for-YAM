const body = document.body;

const applyTheme = () => {
    if (!body.classList.contains('ym-dark-theme') && !body.classList.contains('ym-light-theme')) {
        body.classList.add('ym-dark-theme');
    } else if (body.classList.contains('ym-light-theme')) {
        body.classList.replace('ym-light-theme', 'ym-dark-theme');
    }
};

applyTheme();

const observer = new MutationObserver(() => applyTheme());

observer.observe(body, { attributes: true, attributeFilter: ['class'] });

(function() {
    'use strict';

    let newWaveEnabled = true; // true - новая волна, false - старая
    let imageUrl = 'http://127.0.0.1:2007/assets/banner.png?name=AlreadyRed'; // ССЫЛКА НА ТВОЮ КАРТИНКУ

    function createContainer(id, parent) {
        let container = document.getElementById(id);
        if (!container) {
            container = document.createElement('div');
            container.id = id;
            container.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                pointer-events: none;
                background: url(${imageUrl}) center/cover no-repeat;
                opacity: 1;
            `;
            parent.style.position = 'relative';
            parent.insertBefore(container, parent.firstChild);
        }
        return container;
    }

    function getVibeContainer() {
        const oldContainer = document.getElementById('vibe-background-container');
        if (newWaveEnabled) {
            const vibe = document.querySelector('[class*="VibePage_root"]') || document.querySelector('[data-test-id="MAIN_PAGE"]');
            if (!vibe) { oldContainer?.remove(); return null; }
            vibe.style.position = 'relative';
            return createContainer('vibe-background-container', vibe);
        } else {
            const vibe = document.querySelector('[class*="MainPage_vibe"]') || document.querySelector('[data-test-id="VIBE_BLOCK"]');
            if (!vibe) { oldContainer?.remove(); return null; }
            vibe.style.setProperty('height', 'calc(100vh - 70px)', 'important');
            vibe.style.setProperty('min-height', 'calc(100vh - 70px)', 'important');
            vibe.style.setProperty('padding', '0', 'important');
            return createContainer('vibe-background-container', vibe);
        }
    }

    // Запускаем при загрузке и каждые 2 секунды (Яндекс динамический)
    function init() {
        getVibeContainer();
    }

    // Ждём загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Обновляем при смене трека
    setInterval(init, 2000);
})();
