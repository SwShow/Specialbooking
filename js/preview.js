const card = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');


const TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
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
};
const addedData = (data) => {

  for (let i = 0; i < data.length; i++) {
    const element = card.cloneNode(true);
    const fragmentElement = document.createDocumentFragment();
    const photoAvatar = element.querySelector('.popup__avatar');
    if (data[i].avatar) {
      photoAvatar.src = data[i].avatar;
    } else {
      photoAvatar.remove();
    }
    element.querySelector('h3').textContent = data[i].offer.TITLE;
    element.querySelector('.popup__text--address').textContent = `lat: ${data[i].offer.address.lat}, lon: ${data[i].offer.address.lon}`;
    const price = element.querySelector('.popup__text--price');
    price.textContent = `${data[i].offer.price} ₽/ночь`;
    element.querySelector('.popup__type').textContent = TYPE[data[i].offer.type];
    element.querySelector('.popup__text--capacity').textContent = `${data[i].offer.rooms} комнаты для
      ${data[i].offer.guests} гостей`;
    element.querySelector('.popup__text--time').textContent = `Заезд после ${data[i].offer.checkin}
    , выезд до ${data[i].offer.checkout}`;
    element.querySelector('.popup__description').textContent = data[i].offer.description;
    const photoOffer = element.querySelector('.popup__photos');
    const images = data[i].offer.photos;
    addedPhotos(images, photoOffer);
    const feature = data[i].offer.features;
    const popupFeatures = element.querySelector('.popup__features');

    removedFeatures(feature, popupFeatures);

    fragmentElement.append(element);
    mapCanvas.appendChild(fragmentElement);
  }

}
export {addedData};

