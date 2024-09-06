const token = '7286118042:AAH_RhoEiDRPndIeP2my7Igdj6wbV5FMF1g';
const chatId = '746586393';
const URL_API = 'https://api.telegram.org/';

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', (event) => {
event.preventDefault();
const message = 'Имя : ' + sendName.value + '\nГость или исполнитель: ' + messageInput.value + " " + '\nНомер телефона: ' + " " + sendTel.value;
if (message) {
axios.post(`${URL_API}bot${token}/sendMessage`, {
chat_id: chatId,
text: message,
})
.then(response => console.log(response), alert('Ваше сообщение успешно отправлено!✅ \nМы обязательно свяжемся с вами! \nСпасибо!💚'))
.catch(error => console.error(error));
}
});
