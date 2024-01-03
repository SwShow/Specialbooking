import { housingType } from './move.js';

const filterType = (data) => {
  if (housingType.value === 'any') {
    return data.slice(0, 10);
  } else {
    return data.filter((elem) => elem.offer.type === housingType.value)
      .slice(0, 10);
  }
};

export { filterType };
