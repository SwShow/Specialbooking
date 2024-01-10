import { showGroupMarker} from './map.js';
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
const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const TYPEFLAT = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

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

type.onchange = () => {
  const val = type.value;
  price.min = TYPEFLAT[val];
  price.placeholder = TYPEFLAT[val];
};

timein.onchange = () => {
  timeout.disabled = false;
  timeout.value = timein.value;
};

roomNumber.onchange = () => {
  capacity.disabled = false;
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

export { housingType, housingPrice, housingRoom, housingGuests, mapFilter };
