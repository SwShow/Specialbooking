const error = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const success = document.querySelector('#success').content.querySelector('.success');

const Success = () => {
  const cloneSuccess = success.cloneNode(true);
  cloneSuccess.classList.remove('hidden');
  document.addEventListener('keydown', () => {
    cloneSuccess.classList.add('hidden');
  });
  body.append(cloneSuccess);
};

const Error = () => {
  const cloneError = error.cloneNode(true);
  cloneError.classList.remove('hidden');
  document.addEventListener('keydown', () => {
    cloneError.classList.add('hidden');
  });
  const button = cloneError.querySelector('.error__button');
  button.onclick = () => {
    cloneError.classList.add('hidden');
  }
  body.append(cloneError);
};

const check = [
  '12:00',
  '13:00',
  '14:00',
];

const types = [
  'palace',
  'flat',
  'hotel',
  'house',
  'bungalow',
];

const meanFeatures = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];

const descriptions = [
  'There is beautiful view of the wall of the neighboring house.',
  'There is a great wet wind from the sea.',
  'A bench at the train station will seem the best shelter.',
  'There is a cafe on the ground floor.',
];

const meanPhotos = [
  'https://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'https://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'https://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const onError = (message) => {
  const messageError = document.createElement('div');
  messageError.style.zIndex = '100';
  messageError.style.position = 'absolute';
  messageError.style.left = '0';
  messageError.style.top = '0';
  messageError.style.right = '0';
  messageError.style.padding = '10px 3px';
  messageError.style.fontSize = '30px';
  messageError.style.textAlign = 'center';
  messageError.style.backgroundColor = 'red';

  messageError.textContent = message;

  document.body.append(messageError);

  setTimeout(() => {
    messageError.remove();
  }, 5000);
};

export {check, types, descriptions, meanPhotos, meanFeatures, Error, onError, Success};
