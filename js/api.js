const backData = (onSuccess) => {
  const getUrl = 'https://26.javascript.pages.academy/keksobooking/data';

  fetch(getUrl)
    .then((response) => response.json())

    .then((data) => {
      onSuccess(data);
      // eslint-disable-next-line no-console
      console.log(data);
    })

    .catch(() => {
      //Ловим ошибку и показываем блок ошибки
      // eslint-disable-next-line no-console
      console.log('Сервер не доступен');
    });
};
backData();

//export {backData};

