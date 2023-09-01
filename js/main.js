/*Функция, возвращающая случайное целое число из переданного диапазона включительно.*/
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

/*
Cоздание массива из 10 объектов*/

const check = [
  '12:00',
  '13:00',
  '14:00',
];

const types = [
  'palace',
  'flat',
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


// eslint-disable-next-line no-console
console.log(createArrays());
function getAddress () {
  const address = [];
  address.push({
    lat: getLocation(35.65000, 35.70000),
    lon: getLocation(139.70000, 139.80000),
  });
  // eslint-disable-next-line no-console
  console.log(address);
  return address;
}
function getLocation (a, b) {
  return randSwimPoint(a, b);
}
function shuffle(mean) {
  let arr = [];// возвращаемый массив
  let l = [];// массив для добавления использованных ключей
  for (let i = 0; i < mean.length; i++) {
    let k = randInt(0, mean.length - 1);
    if (l.includes(k)) {
      // eslint-disable-next-line no-console
      console.log(arr);
      return arr;
    }
    arr.push(mean[k]);
    l.push(k);
  }
  // eslint-disable-next-line no-console
  console.log(arr);
  return arr;
}

function createArrays() {
  const arrays = [];
  for (let i = 0; i < 10; i++) {
    arrays.push(
      {
        avatar: 'img/avatars/user0' + randInt(1, 8) + '.png',
        offer:
        {
          TITLE: 'WELCOME, TOURISTS',
          address: getAddress(),//!!!
          price: randInt(1000, 10000),
          type: types[randInt(0, 3)],
          rooms: randInt(1, 3),
          guests: randInt(1, 3),
          checkin: check[randInt(0, 2)],
          checkout: check[randInt(0, 2)],
          features: shuffle(meanFeatures),//!!!
          description: descriptions[randInt(0, 3)],
          photos: shuffle(meanPhotos),//!!!
        },
      });
  }
  return arrays;
}
