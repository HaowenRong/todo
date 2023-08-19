
export function message(message, type) {
  // create message
  const newMessage = document.createElement('div');
  newMessage.classList = `message ${type}`; // type changes it color using a class
  newMessage.textContent = message;

  // toggle animation to show animation
  setTimeout(() => {
    newMessage.classList.toggle(`message__expanded`);
  }, 0);

  // set timeout to remove message
  setTimeout(() => {
    newMessage.classList.toggle(`message__expanded`);
    setTimeout(() => {
      newMessage.remove();
    }, 200);
  }, 5000);

  const messageContainer = document.getElementById('messages');
  messageContainer.appendChild(newMessage);
}
