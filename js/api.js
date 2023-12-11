import {onError, Success, Error} from './data.js';

const URL = {
  POST: 'https://26.javascript.pages.academy/keksobooking',
  GET:'https://23.javascript.pages.academy/keksobooking/data',
};
const fetchData = (onSuccess)  => {
  fetch(URL.GET)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => {
      onError('Что-то пошло не так...');
    });
};

const postData = (body) => {
  fetch(URL.POST,
    {
      method: 'POST',
      body,
      type: 'multipart/form-data',
    })
    .then((response) => {
      if (!response.ok) {
        //buttonUnblock();
        Success();

      } else {
        onError(`${response  }OK`);
      }
    })
    .catch(() => {
      Error();
    });
};
export { fetchData, postData };
