/*Функция, возвращающая случайное целое число из переданного диапазона включительно.*/
import { check, types, descriptions, meanPhotos, meanFeatures } from './data.js';

const randInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. */
const randSwimPoint = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(5);
}

const location = (a, b) => {
  return randSwimPoint(a, b);
}

const coordinates = () => {
  const address = [];
  address.push({
    lat: location(35.65000, 35.70000),
    lon: location(139.70000, 139.80000),
  });
  return address;
}

const shuffle = (mean) => {
  let arr = [];// возвращаемый массив
  let l = [];// массив для добавления использованных ключей
  for (let i = 0; i < mean.length; i++) {
    let k = randInt(0, mean.length - 1);
    if (l.includes(k)) {
      return arr;
    }
    arr.push(mean[k]);
    l.push(k);
  }
  return arr;
}

// создание массива конечного значения
const arrays = () => {
  const array = [];
  for (let i = 0; i < 10; i++) {
    array.push(
      {
        avatar: 'img/avatars/user0' + randInt(1, 8) + '.png',
        offer:
          {
            TITLE: 'WELCOME, TOURISTS',
            address: coordinates(),
            price: randInt(1000, 10000),
            type: types[randInt(0, 3)],
            rooms: randInt(1, 3),
            guests: randInt(1, 3),
            checkin: check[randInt(0, 2)],
            checkout: check[randInt(0, 2)],
            features: shuffle(meanFeatures),
            description: descriptions[randInt(0, 3)],
            photos: shuffle(meanPhotos),
          },
      });
  }
  return array;
}
export { arrays };
