const card = document.querySelector('#card').content.querySelector('.popup');

const TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const addedPhotos = (images, photoOffer) => {
  const pElement = photoOffer.querySelector('.popup__photo');
  for (let j = 0; j < images.length; j++) {
    const photoElement = pElement.cloneNode(true);
    photoElement.src = images[j];
    photoOffer.appendChild(photoElement);
  }
  photoOffer.removeChild(pElement);
};

const removedFeatures = (feature, popupFeatures) => {
  if (!(feature.includes('wifi'))) {
    popupFeatures.querySelector('.popup__feature--wifi').classList.add('hidden');
  }
  if (!(feature.includes('dishwasher'))) {
    popupFeatures.querySelector('.popup__feature--dishwasher').classList.add('hidden');
  }
  if (!(feature.includes('parking'))) {
    popupFeatures.querySelector('.popup__feature--parking').classList.add('hidden');
  }
  if (!(feature.includes('washer'))) {
    popupFeatures.querySelector('.popup__feature--washer').classList.add('hidden');
  }
  if (!(feature.includes('elevator'))) {
    popupFeatures.querySelector('.popup__feature--elevator').classList.add('hidden');
  }
  if (!(feature.includes('conditioner'))) {
    popupFeatures.querySelector('.popup__feature--conditioner').classList.add('hidden');
  }
  return popupFeatures;
};
const addedData = (data) => {

  const element = card.cloneNode(true);
  //const fragmentElement = document.createDocumentFragment();
  const photoAvatar = element.querySelector('.popup__avatar');
  if (data.author.avatar) {
    photoAvatar.src = data.author.avatar;
  } else {
    photoAvatar.remove();
  }
  element.querySelector('h3').textContent = data.offer.title;
  element.querySelector('.popup__text--address').textContent = data.offer.address;
  element.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  element.querySelector('.popup__type').textContent = TYPE[data.offer.type];
  element.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для
      ${data.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}
    , выезд до ${data.offer.checkout}`;
  element.querySelector('.popup__description').textContent = data.offer.description;
  const photoOffer = element.querySelector('.popup__photos');
  const images = data.offer.photos;
  addedPhotos(images, photoOffer);
  const feature = data.offer.features;
  const popupFeatures = element.querySelector('.popup__features');

  removedFeatures(feature, popupFeatures);

  return element;
};

export { addedData };
