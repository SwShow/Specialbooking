import { postData } from './api.js';

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
housingType.onchange = () => {
  const changePrice = () => {
    switch (housingType.value) {
      case 'flat':
        housingPrice.value = 'low';
        break;
      case 'bungalow':
        housingPrice.value = 'middle';
        break;
      case 'house':
        housingPrice.value = 'middle';
        break;
      case 'hostel':
        housingPrice.value = 'middle';
        break;
      case 'palace':
        housingPrice.value = 'high';
    }
  }
  changePrice();
}

const type = document.querySelector('#type');
const price = document.querySelector('#price');
type.onchange = () => {
  switch (type.value) {
    case 'bungalow':
      price.min = 0;
      price.placeholder= 0;
      break;
    case 'flat':
      price.min = 1000;
      price.placeholder= 1000;
      break;
    case 'hotel':
      price.min = 3000;
      price.placeholder = 3000;
      break;
    case 'house':
      price.min = 5000;
      price.placeholder = 5000;
      break;
    case 'palace':
      price.min = 10000;
      price.placeholder = 10000;
      break;
  }
};

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
timein.onchange = () => {
  timeout.disabled = false;
  timeout.value = timein.value;
};

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
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
const adForm = document.querySelector('.ad-form');

adForm.addEventListener('submit', (event) => {
  event.preventDefault();
  return postData(new FormData(event.target));
});


