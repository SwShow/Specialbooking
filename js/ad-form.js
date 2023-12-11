import { postData } from './api.js';
import { Error } from './data.js'

const adForm = document.querySelector('.ad-form');
const titleFieldElement = adForm.querySelector('[name="title"]');
const formButton = adForm.querySelector('.ad-form__submit');
const formAddress = adForm.querySelector('[name="address"]');
const formPrice = adForm.querySelector('[name="price"]');
const formTypeHouse = adForm.querySelector('#type').value;

const buttonBlock = () => {
  formButton.disabled = 'true';
  formButton.textContent = 'Опубликовываю...';
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__element--error',
});
const checkLength = (value) => {
  const text = value.split(' ');
  return text.every((item) => item.length <= 30);
};

const checkAddress = (value) => {
  return !(value === '');
}

const checkPrice = (value) => {
  switch (formTypeHouse) {
    case 'bungalow': return value > 0;
    case 'flat': return value > 5000;
    case 'house': return value > 5000;
    case 'palace': return value > 10000;
  }
}

pristine.addValidator(titleFieldElement, checkLength);
pristine.addValidator(formAddress, checkAddress);
pristine.addValidator(formPrice, checkPrice);
const buttonUnBlock = () => {
  formButton.removeAttribute('disabled');
  formButton.textContent = 'Опубликовать';
};
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const valid = pristine.validate();
  if(valid) {
    buttonBlock();
    postData(new FormData(evt.target), buttonUnBlock);
  } else {
    Error();
  }
});

