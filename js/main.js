// ========================
// POPUP KVARTIRNIK
// ========================
let popupBg_kvartirnik = document.querySelector('.popup__bg_kvartirnik');
let popup_kvartirnik = document.querySelector('.popup_kvartirnik');
let openPopupButtons_kvartirnik = document.querySelectorAll('.open-popup_kvartirnik'); 
let closePopupButton_kvartirnik = document.querySelector('.close-popup_kvartirnik'); 
let scrollPosition = 0;

function lockScroll() {
    scrollPosition = window.scrollY;
    document.documentElement.classList.add('lock-scroll');
    document.body.classList.add('lock-scroll');
    document.body.style.top = `-${scrollPosition}px`;
}

function unlockScroll() {
    document.documentElement.classList.remove('lock-scroll');
    document.body.classList.remove('lock-scroll');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
}

// открытие popup
openPopupButtons_kvartirnik.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        popupBg_kvartirnik.classList.add('active');
        popup_kvartirnik.classList.add('active');
        lockScroll();
    });
});

// закрытие popup по кресту
if (closePopupButton_kvartirnik) {
    closePopupButton_kvartirnik.addEventListener('click', () => {
        popupBg_kvartirnik.classList.remove('active');
        popup_kvartirnik.classList.remove('active');
        unlockScroll();
    });
}

// закрытие по клику на фон
document.addEventListener('click', e => {
    if (e.target === popupBg_kvartirnik) {
        popupBg_kvartirnik.classList.remove('active');
        popup_kvartirnik.classList.remove('active');
        unlockScroll();
    }
});

// проверка всех обязательных полей
function checkFormValidityKvartirnik() {
    const fields = ['sendName_kvartirnik','sendTel_kvartirnik','messageInputguest_or_performer_kvartirnik'];
    return fields.every(id => document.getElementById(id)?.value.trim()) &&
           document.querySelector('input[name="consent"]')?.checked;
}

// ========================
// ПОДАЧА ЗАЯВКИ — ФОРМА
// ========================
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    if (!checkFormValidityKvartirnik()) {
        alert('Пожалуйста, заполните все обязательные поля!');
        return;
    }

    const formData = {
        firstName: document.getElementById('sendName_kvartirnik').value.trim(),
        phone: document.getElementById('sendTel_kvartirnik').value.replace(/\D/g, ''),
        guest_or_performer: document.getElementById('messageInputguest_or_performer_kvartirnik').value.trim(),
        consent: document.querySelector('input[name="consent"]').checked ? "✅ Да" : "❌ Нет"
    };

    // 👇 Сразу закрываем форму и основной popup
    document.getElementById('contactForm').reset();
    popupBg_kvartirnik.classList.remove('active');
    popup_kvartirnik.classList.remove('active');
    unlockScroll();

    // 👇 Показываем окно ожидания
    loadingPopup.style.display = "block";

    // Скрываем окно ожидания через 3 секунды (или можно 6)
    setTimeout(() => {
        loadingPopup.style.display = "none";
    }, 5000);

    try {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyrpOx4KjWAD9UnbIRFE3v6k3vQaX0nzvP9KS8HSn5_ZYIsDNbinUr4brRZgaCH--UD/exec';
        await fetch(scriptURL, { method: 'POST', body: JSON.stringify(formData) });

        // после успешной отправки показываем success-popup
        finalizeFormSubmit(true);
    } catch (error) {
        console.error('Ошибка при отправке:', error);
        // если произошла ошибка, показываем error-popup
        finalizeFormSubmit(false);
    }
});


// ========================
// КАПИТАЛИЗАЦИЯ ПЕРВОЙ БУКВЫ
// ========================
function capitalizeFirstLetter(input) {
    input.value = input.value.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

['sendName_kvartirnik'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => capitalizeFirstLetter(el));
});

// ========================
// ФУНКЦИИ ПОСЛЕ ОТПРАВКИ
// ========================
function finalizeFormSubmit(success) {
    if (success) {
        showMainregPopup('mainregSuccessPopup');
        document.getElementById('contactForm').reset();

        // закрываем основной popup
        popupBg_kvartirnik.classList.remove('active');
        popup_kvartirnik.classList.remove('active');
        unlockScroll();
    } else {
        showMainregPopup('mainregErrorPopup');
    }
}

// показ уведомления success/error
function showMainregPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'block';

    const closeBtn = popup.querySelector('.mainreg-popup-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => popup.style.display = 'none');

    setTimeout(() => popup.style.display = 'none', 15000);
}

const loadingPopup = document.getElementById("mainregLoadingPopup");

// правки для Рождества
// JavaScript для фиксации навбара
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('tm-nav');
    const navbarOffset = navbar.offsetTop - 90; // Учитываем изначальное смещение
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;

        if (currentScrollY > navbarOffset) {
            navbar.classList.add('fixed');
            navbar.style.top = '0';
        } else {
            navbar.classList.remove('fixed');
            navbar.style.top = '90px';
        }

        // Дополнительно проверяем направление прокрутки
        if (currentScrollY < lastScrollY && currentScrollY < navbarOffset) {
            navbar.classList.remove('fixed');
            navbar.style.top = '90px';
        }

        lastScrollY = currentScrollY;
    });
});

