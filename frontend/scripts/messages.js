
export function message(message, type) {
  // append message to message section
  const newMessage = document.createElement('div');
  newMessage.classList = 'message';
  newMessage.textContent = message;
  newMessage.classList.toggle(`message__expanded`);
  newMessage.classList.toggle(type);

  const messageContainer = document.getElementById('messages');
  messageContainer.appendChild(newMessage);
}