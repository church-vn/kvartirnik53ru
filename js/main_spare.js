
// popup
let popupBg_kvartirnik = document.querySelector('.popup__bg_kvartirnik');
let popup_kvartirnik = document.querySelector('.popup_kvartirnik');
let openPopupButtons_kvartirnik = document.querySelectorAll('.open-popup_kvartirnik'); 
let closePopupButton_kvartirnik = document.querySelector('.close-popup_kvartirnik'); 
let closePopupButtonSubmit_kvartirnik = document.querySelector('.close_through_submit_kvartirnik');

openPopupButtons_kvartirnik.forEach((button) => { 
    button.addEventListener('click', (e) => { 
        e.preventDefault(); 
        popupBg_kvartirnik.classList.add('active'); 
        popup_kvartirnik.classList.add('active'); 
    })
});

closePopupButton_kvartirnik.addEventListener('click',() => { 
    popupBg_kvartirnik.classList.remove('active');
    popup_kvartirnik.classList.remove('active'); 
});

document.addEventListener('click', (e) => { 
    if(e.target === popupBg_kvartirnik) { 
        popupBg_kvartirnik.classList.remove('active');
        popup_kvartirnik.classList.remove('active');
    }
});

closePopupButtonSubmit_kvartirnik.addEventListener('click',() => { 
    popupBg_kvartirnik.classList.remove('active');
    popup_kvartirnik.classList.remove('active');
});






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





// ========================
// ПОДАЧА ЗАЯВКИ — ФОРМА. Пока что только для страницы christmas_2026.html
// ========================
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        firstName: document.getElementById('sendName_kvartirnik').value.trim(),
        phone: document.getElementById('sendTel_kvartirnik').value.replace(/\D/g, ''),
        guest_or_performer: document.getElementById('messageInputpass_kvartirnik').value.trim(),
        consent: document.querySelector('input[name="consent"]').checked ? "✅ Да" : "❌ Нет"
    };


    // --- Отправка в Google Apps Script ---
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw5JsW-0EUbNhNwlwiDU1XN0IB5JFILdwFFCS0MPe3knFw9dPDWLB7YxyHzCDA_0XKLQ/exеc';
    fetch(scriptURL, { method: 'POST', body: JSON.stringify(formData) })
        .then(response => response.text())
        .catch(error => console.error('Ошибка Google Script:', error));

        finalizeFormSubmit(true);
});




// ========================
// ФУНКЦИИ ПОСЛЕ ОТПРАВКИ
// ========================
function finalizeFormSubmit(success) {
    if (success) {
        showMainregPopup('mainregSuccessPopup');
        document.getElementById('contactForm').reset();
    } else {
        showMainregPopup('mainregErrorPopup');
    }
    popupBg_mti.classList.remove('active');
    popup_mti.classList.remove('active');
    unlockScroll();
}

function showMainregPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'block';

    const closeBtn = popup.querySelector('.mainreg-popup-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => popup.style.display = 'none');

    setTimeout(() => popup.style.display = 'none', 15000);
}


