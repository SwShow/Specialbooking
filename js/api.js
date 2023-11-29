import {Error, onError, Success} from './data.js';

const fetchData = (onSuccess)  => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then(response => response.json())
    .then((data) => onSuccess(data))
    .catch(() => {
      onError('Сервер не отвечает');
    });
};

const postData = (body) => {
  fetch('https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
      type: 'multipart/form-data',
    })
    .then((response) => {
      if (response.ok) {
        Success();
      } else {
        Error();
      }
    })

    .catch(() => {
      Error();
    });
};
export { fetchData, postData };
