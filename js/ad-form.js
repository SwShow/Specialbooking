import { postData } from './api.js';
import { Error } from './data.js';
import { resetMap } from './map.js';
import { adForm, resetSlider } from './move.js';

// eslint-disable-next-line no-undef
Logger.useDefaults();
const mapFilters = document.querySelectorAll('.map__filter');
const housingFeatures = document.querySelectorAll('[name="features"]');
const titleFieldElement = adForm.querySelector('[name="title"]');
const formButton = adForm.querySelector('.ad-form__submit');
const formAddress = adForm.querySelector('[name="address"]');
const formPrice = adForm.querySelector('[name="price"]');
const type = adForm.querySelector('#type');
const TEXT_LENGTH = 30;

// -- блокировать кнопки
const buttonBlock = () => {
  formButton.disabled = 'true';
  formButton.textContent = 'Опубликовываю...';
};

// eslint-disable-next-line no-undef
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__element--error',
});

const checkLength = (value) => {
  const text = value.split(' ');
  return text.length <= TEXT_LENGTH;
};

const checkAddress = (value) => {
  return !(value === '');
};

const checkPrice = (value) => {
  // eslint-disable-next-line no-undef
  Logger.info(`вводимая цена: ${value}`);
  switch (type.value) {
    case 'bungalow': return value > 0;
    case 'flat': return value > 1000;
    case 'hotel': return value > 3000;
    case 'house': return value > 5000;
    case 'palace': return value > 10000;
  }
};

pristine.addValidator(titleFieldElement, checkLength);
pristine.addValidator(formAddress, checkAddress);
pristine.addValidator(formPrice, checkPrice);

// -- разблокировать кнопки
const buttonUnBlock = () => {
  formButton.removeAttribute('disabled');
  formButton.textContent = 'Опубликовать';
};
// -- отправить данные формы
const addMapHouse = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    if(valid) {
      buttonBlock();
      postData(new FormData(evt.target), buttonUnBlock);
      evt.target.reset();
      resetMap();
      resetSlider();
    } else {
      Error();
    }
  });
};

const formDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.forEach((elem) => elem.disabled = true);
  housingFeatures.forEach((elem) => elem.disabled = true);
};

const formEnabled = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.forEach((elem) => elem.disabled = false);
  housingFeatures.forEach((elem) => elem.disabled = false);
};

export { addMapHouse, formDisabled, formEnabled, mapFilters };
