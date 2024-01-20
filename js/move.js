import { showGroupMarker} from './map.js';

// eslint-disable-next-line no-undef
Logger.useDefaults();
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

const TYPEFLAT_MIN = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

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
type.addEventListener('change',  (evt) => {
  const val = evt.target.value;
  slider.noUiSlider.set(TYPEFLAT_MIN[val]);
  price.value = '';
  price.placeholder = TYPEFLAT_MIN[val];
});

slider.noUiSlider.on('update', () => {
  price.value = (slider.noUiSlider.getPositions()) * 500;
});
price.addEventListener('click', () => {
  slider.noUiSlider.set(price.value);
});

const resetSlider = () => {
  slider.noUiSlider.reset();
};

adForm.addEventListener('reset', () => {
  resetSlider();
});

housingType.onchange = () => {
  const changePrice = () => {
    switch (housingType.value) {
      case 'flat':
        housingPrice.value = 'middle';
        break;
      case 'bungalow':
        housingPrice.value = 'low';
        break;
      case 'house':
        housingPrice.value = 'middle';
        break;
      case 'hotel':
        housingPrice.value = 'middle';
        break;
      case 'palace':
        housingPrice.value = 'high';
    }
  }
  changePrice();
  showGroupMarker();
}

timein.onchange = () => {
  timeout.value = timein.value;
};

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
