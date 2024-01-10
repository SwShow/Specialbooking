import { housingGuests, housingPrice, housingRoom, housingType } from './move.js';

//const mapCheckbox = document.querySelectorAll('.map__checkbox');

const PRICE = {
  'min': 10000,
  'max': 50000,
};

/*const boxCheckbox = () => {
  const box = [];
  mapCheckbox.forEach((el) => {
    if (el.checked) {
      box.push(el.value);
    }
    return box;
  });
};

const offerFutures = (elem) => {
  let arrFutures = [];
  if (elem.offer.features) {
    arrFutures = elem.offer.features;
  }
  return arrFutures;
};*/

const filterData = (data) => {
  if (!(housingType.value === 'any')) {
    data = data.filter((elem) => elem.offer.type === housingType.value);
  }
  if (!(housingPrice.value === 'any')) {
    data = data.filter((elem) => {
      switch (housingPrice.value) {
        case 'middle':
          return elem.offer.price > PRICE.min && elem.offer.price < PRICE.max;
        case 'low':
          return elem.offer.price < PRICE.min;
        case 'high':
          return elem.offer.price > PRICE.max;
      }
    });
  }
  if (!(housingRoom.value === 'any')) {
    data = data.filter((elem) => elem.offer.rooms === +(housingRoom.value));
  }
  if (!(housingGuests.value === 'any')) {
    data = data.filter((elem) => elem.offer.guests === +(housingGuests.value));
  }
  /*data = data.filter((elem) =>  {return offerFutures(elem).forEach((e) => {
    boxCheckbox.contains(e);
  });
  });*/
  return data.slice(0, 10);
};

export { filterData };
