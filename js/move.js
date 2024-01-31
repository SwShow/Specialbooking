import { showGroupMarker} from './map.js';
import { renderHouse, avatar} from './ad-foto.js';

// eslint-disable-next-line no-undef
Logger.useDefaults();

// -- функция устранения дребезга
const debounce = (cb, timer) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, args), timer);
  };
};

const DEBOUNCE_TIMER = 1000;
const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingGuests = mapFilter.querySelector('#housing-guests');
const housingRoom = mapFilter.querySelector('#housing-rooms');
const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const TYPEFLAT_MAX = 50000;

const TYPEFLAT_GRAD = {
  'any': 'any',
  'flat': 'middle',
  'house': 'middle',
  'hotel': 'middle',
  'bungalow': 'low',
  'palace': 'high',
};

const TYPEFLAT_MIN = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

// -- инициализация слайдера
const slider = document.createElement('div');
slider.setAttribute('id', 'noUi-connect');
// eslint-disable-next-line no-undef
noUiSlider.create(slider, {
  start: 5000,
  connect: 'lower',
  range: {
    'min': 0,
    'max': TYPEFLAT_MAX,
  },
  step: 1,
});

slider.style.width = '92%';

adForm.children[4].appendChild(slider);

// -- изменение прайса в зависимости от типа жилья
type.addEventListener('change',  (evt) => {
  const val = evt.target.value;
  slider.noUiSlider.set(TYPEFLAT_MIN[val]);
  price.value = '';
  price.placeholder = TYPEFLAT_MIN[val];
});

// -- изменение прайса в зависимости от положения курсора на слайдере
slider.noUiSlider.on('update', () => {
  price.value = (slider.noUiSlider.getPositions()) * 500;
});

// -- изменение положения курсора на слайдере в зависимости от ввода цены в поле прайса
price.addEventListener('click', () => {
  slider.noUiSlider.set(price.value);
});

const resetSlider = () => {
  slider.noUiSlider.reset();
};

// -- удаление фотографий жилья
const deleteChild = () => {
  let child = renderHouse.lastElementChild;
  while (child) {
    renderHouse.removeChild(child);
    child = renderHouse.lastElementChild;
  }
};

// -- сброс формы
adForm.addEventListener('reset', () => {
  resetSlider();
  // --- удалить фото
  avatar.src = 'img/muffin-grey.svg';
  deleteChild();
});

// -- фильтрация маркеров по типу жилья
housingType.onchange = () => {
  housingPrice.value = TYPEFLAT_GRAD[housingType.value];
  showGroupMarker();
};

// -- изменение времени выезда при изменении времени заезда
timein.onchange = () => {
  timeout.value = timein.value;
};

// -- показ возможного количества гостей в зависимости от количества комнат
roomNumber.onchange = () => {
  switch (roomNumber.value) {
    case '1':
      capacity.value = '1';
      capacity.children[2].classList.remove('hidden');
      capacity.children[0].classList.add('hidden');
      capacity.children[1].classList.add('hidden');
      capacity.children[3].classList.add('hidden');
      break;
    case '100':
      capacity.value = '0';
      capacity.children[3].classList.remove('hidden');
      capacity.children[0].classList.add('hidden');
      capacity.children[1].classList.add('hidden');
      capacity.children[2].classList.add('hidden');
      break;
    case '3':
      capacity.value = '3';
      capacity.children[0].classList.remove('hidden');
      capacity.children[1].classList.remove('hidden');
      capacity.children[2].classList.remove('hidden');
      capacity.children[3].classList.add('hidden');
      break;
    case '2':
      capacity.value = '2';
      capacity.children[1].classList.remove('hidden');
      capacity.children[2].classList.remove('hidden');
      capacity.children[0].classList.add('hidden');
      capacity.children[3].classList.add('hidden');
      break;
  }
};

mapFilter.addEventListener('change', debounce(() =>
  showGroupMarker(), DEBOUNCE_TIMER));

export { adForm, housingType, housingPrice, housingRoom, housingGuests, mapFilter,
  resetSlider };
