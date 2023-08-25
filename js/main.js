/*Функция, возвращающая случайное целое число из переданного диапазона включительно.*/
const randInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max > min) {
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
  if (max > min) {
    [min, max] = [max, min];
  }
  return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(1);
}

// eslint-disable-next-line no-console
console.log('randInt = ' + randInt(3, 8));

// eslint-disable-next-line no-console
console.log('randSwimPoint = ' + randSwimPoint(3.2, 8.4));

