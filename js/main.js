// ========================
// GLOBAL VARIABLES
// ========================
let scrollPosition = 0;

// ========================
// SCROLL LOCK FUNCTIONS
// ========================
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

// ========================
// POPUP KVARTIRNIK
// ========================
const popupBg_kvartirnik = document.querySelector('.popup__bg_kvartirnik');
const popup_kvartirnik = document.querySelector('.popup_kvartirnik');
const openPopupButtons_kvartirnik = document.querySelectorAll('.open-popup_kvartirnik'); 
const closePopupButton_kvartirnik = document.querySelector('.close-popup_kvartirnik'); 
const kvartirnikAudio = document.getElementById("kvartirnikAudio");

// Открытие popup + музыка
openPopupButtons_kvartirnik.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        popupBg_kvartirnik.classList.add('active');
        popup_kvartirnik.classList.add('active');
        lockScroll();

        kvartirnikAudio.currentTime = 0;
        kvartirnikAudio.play().catch(()=>{});
    });
});

// Закрытие popup по кресту
if (closePopupButton_kvartirnik) {
    closePopupButton_kvartirnik.addEventListener('click', () => {
        popupBg_kvartirnik.classList.remove('active');
        popup_kvartirnik.classList.remove('active');
        unlockScroll();

        kvartirnikAudio.pause();
        kvartirnikAudio.currentTime = 0;
    });
}

// Закрытие по клику на фон
document.addEventListener('click', e => {
    if (e.target === popupBg_kvartirnik) {
        popupBg_kvartirnik.classList.remove('active');
        popup_kvartirnik.classList.remove('active');
        unlockScroll();

        kvartirnikAudio.pause();
        kvartirnikAudio.currentTime = 0;
    }
});

// ========================
// FORM VALIDATION KVARTIRNIK
// ========================
function checkFormValidityKvartirnik() {
    const fields = ['sendName_kvartirnik','sendTel_kvartirnik','messageInputguest_or_performer_kvartirnik'];
    return fields.every(id => document.getElementById(id)?.value.trim()) &&
           document.querySelector('input[name="consent"]')?.checked;
}

// ========================
// FORM SUBMISSION
// ========================
const loadingPopup = document.getElementById("mainregLoadingPopup");

document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    if (kvartirnikAudio) {
        kvartirnikAudio.pause();
        kvartirnikAudio.currentTime = 0;
    }

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

    // Закрываем форму и popup
    document.getElementById('contactForm').reset();
    popupBg_kvartirnik.classList.remove('active');
    popup_kvartirnik.classList.remove('active');
    unlockScroll();

    // Показываем loading popup
    loadingPopup.style.display = "block";

    setTimeout(() => {
        loadingPopup.style.display = "none";
    }, 5000);

    try {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyrpOx4KjWAD9UnbIRFE3v6k3vQaX0nzvP9KS8HSn5_ZYIsDNbinUr4brRZgaCH--UD/exec';
        await fetch(scriptURL, { method: 'POST', body: JSON.stringify(formData) });
        finalizeFormSubmit(true);
    } catch (error) {
        console.error('Ошибка при отправке:', error);
        finalizeFormSubmit(false);
    }
});

// ========================
// POST-SUBMISSION HANDLERS
// ========================
function finalizeFormSubmit(success) {
    if (success) {
        showMainregPopup('mainregSuccessPopup');
        document.getElementById('contactForm').reset();
        popupBg_kvartirnik.classList.remove('active');
        popup_kvartirnik.classList.remove('active');
        unlockScroll();
    } else {
        showMainregPopup('mainregErrorPopup');
    }
}

function showMainregPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'block';

    const closeBtn = popup.querySelector('.mainreg-popup-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => popup.style.display = 'none');

    setTimeout(() => popup.style.display = 'none', 15000);
}

// ========================
// CAPITALIZE FIRST LETTER
// ========================
function capitalizeFirstLetter(input) {
    input.value = input.value.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

['sendName_kvartirnik'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => capitalizeFirstLetter(el));
});

// ========================
// POPUP CHARITY BUTTON
// ========================
const charityBtn = document.querySelector(".xmas-btn-charity");
const charityPopup = document.querySelector(".xmas-popup-charity");
const charityOverlay = document.querySelector(".xmas-popup-overlay");
const charityAudio = document.getElementById("charityAudio");

function openCharityPopup() {
    charityPopup.style.display = 'block';
    charityOverlay.style.display = 'block';
    charityAudio.currentTime = 0;
    charityAudio.play().catch(()=>{});
}

function closeCharityPopup() {
    charityPopup.style.display = 'none';
    charityOverlay.style.display = 'none';
    charityAudio.pause();
    charityAudio.currentTime = 0;
}

if(charityBtn) charityBtn.addEventListener('click', openCharityPopup);
if(charityOverlay) charityOverlay.addEventListener('click', closeCharityPopup);
const charityCloseBtn = charityPopup?.querySelector(".xmas-popup-close");
if(charityCloseBtn) charityCloseBtn.addEventListener("click", closeCharityPopup);

// ========================
// NAVBAR FIXED ON SCROLL
// ========================
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('tm-nav');
    const navbarOffset = navbar.offsetTop - 90;
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

        if (currentScrollY < lastScrollY && currentScrollY < navbarOffset) {
            navbar.classList.remove('fixed');
            navbar.style.top = '90px';
        }

        lastScrollY = currentScrollY;
    });
});

// ========================
// MENU TOGGLE AND SINGLE PAGE NAV
// ========================
function checkAndShowHideMenu() {
    if(window.innerWidth < 768) {
        $('#tm-nav ul').addClass('hidden');                
    } else {
        $('#tm-nav ul').removeClass('hidden');
    }
}

$(function(){
    const tmNav = $('#tm-nav');
    tmNav.singlePageNav();

    checkAndShowHideMenu();
    window.addEventListener('resize', checkAndShowHideMenu);

    $('#menu-toggle').click(function(){
        $('#tm-nav ul').toggleClass('hidden');
    });

    $('#tm-nav ul li').click(function(){
        if(window.innerWidth < 768) {
            $('#tm-nav ul').addClass('hidden');
        }                
    });

    $(document).scroll(function() {
        const distanceFromTop = $(document).scrollTop();
        if(distanceFromTop > 100) {
            tmNav.addClass('scroll');
        } else {
            tmNav.removeClass('scroll');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// ========================
// JQUERY PHONE MASK AND OTHER INITIALIZATION
// ========================
$("input[name='phone']").mask("+7(999) 999-9999");
