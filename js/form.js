const token = '7286118042:AAH_RhoEiDRPndIeP2my7Igdj6wbV5FMF1g';
const chatId = '746586393';
const URL_API = 'https://api.telegram.org/';

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', (event) => {
event.preventDefault();
const message = 'Тема сообщения: Регистрация на квартирник' + '\nИмя : ' + sendName.value + '\nНомер телефона: ' + " " + sendTel.value + '\nРоль: ' + messageInput.value + " ";
if (message) {
axios.post(`${URL_API}bot${token}/sendMessage`, {
chat_id: chatId,
text: message,
})
.then(response => console.log(response), alert('Регистрация на квартирник прошла успешно! ✅'))
.catch(error => console.error(error));
}
});

// форма на popup
const messageInput_kvartirnik = document.getElementById('messageInput_kvartirnik');
const sendButton_kvartirnik = document.getElementById('sendButton_kvartirnik');

sendButton_kvartirnik.addEventListener('click', (event) => {
event.preventDefault();
const message = 'Тема сообщения: ' + messageInput_kvartirnik.value + '\nИмя: ' + sendName_kvartirnik.value + '\nНомер телефона: ' + sendTel_kvartirnik.value + '\nРоль: ' + messageInputpass_kvartirnik.value;
if (message) {
axios.post(`${URL_API}bot${token}/sendMessage`, {
chat_id: chatId,
text: message,
})
.then(response => console.log(response), alert('Регистрация на квартирник прошла успешно! ✅'))
.catch(error => console.error(error));
}
});

