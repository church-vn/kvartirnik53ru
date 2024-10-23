
// popup
let popupBg_kvartirnik = document.querySelector('.popup__bg_kvartirnik');
let popup_kvartirnik = document.querySelector('.popup_kvartirnik');
let openPopupButtons_kvartirnik = document.querySelectorAll('.open-popup_kvartirnik'); 
let closePopupButton_kvartirnik = document.querySelector('.close-popup_kvartirnik'); 
let closePopupButtonSubmit_kvartirnik = document.querySelector('.close_through_submit_kvartirnik');

openPopupButtons_kvartirnik.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg_kvartirnik.classList.add('active'); // Добавляем класс 'active' для фона
        popup_kvartirnik.classList.add('active'); // И для самого окна
    })
});

closePopupButton_kvartirnik.addEventListener('click',() => { // Вешаем обработчик на крестик
    popupBg_kvartirnik.classList.remove('active'); // Убираем активный класс с фона
    popup_kvartirnik.classList.remove('active'); // И с окна
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if(e.target === popupBg_kvartirnik) { // Если цель клика - фот, то:
        popupBg_kvartirnik.classList.remove('active'); // Убираем активный класс с фона
        popup_kvartirnik.classList.remove('active'); // И с окна
    }
});

closePopupButtonSubmit_kvartirnik.addEventListener('click',() => { // Вешаем обработчик на submit
    popupBg_kvartirnik.classList.remove('active'); // Убираем активный класс с фона
    popup_kvartirnik.classList.remove('active'); // И с окна
});

