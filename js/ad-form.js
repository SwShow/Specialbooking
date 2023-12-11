import { postData } from './api.js';

const adForm = document.querySelector('.ad-form');

const formButton = adForm.querySelector('.ad-form__submit');
const buttonBlock = () => {
  formButton.disabled = 'true';
  formButton.textContent = 'Опубликовываю...';
};
const buttonUnBlock = () => {
  formButton.removeAttribute('disabled');
  formButton.textContent = 'Опубликовать';
};
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  buttonBlock();
  postData(new FormData(evt.target));
  buttonUnBlock();
});

