const adFormAvatar = document.querySelector('#avatar');
const renderAvatar = document.querySelector('.ad-form-header__preview');
const avatar = renderAvatar.querySelector('img');
const adFormHouse = document.querySelector('#images');
const renderHouse = document.querySelector('.ad-form__photo');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const QUANTA_PHOTO = 4;

const addAvatar = () => {
  adFormAvatar.addEventListener('change', () => {
    const file = adFormAvatar.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        avatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
};

const addPhotoHouse = () => {
  adFormHouse.addEventListener('change', () => {
    if (renderHouse.children.length < QUANTA_PHOTO) {
      const file = adFormHouse.files[0];
      const fileName = file.name.toLowerCase();
      const matches = FILE_TYPES.some((it) => {
        return fileName.endsWith(it);
      });
      if (matches) {
        const imageHouse = document.createElement('img');
        imageHouse.src = URL.createObjectURL(file);
        imageHouse.style.maxWidth = '100%';
        imageHouse.style.height = 'auto';
        renderHouse.appendChild(imageHouse);
      }
    }
  });
};

export { addAvatar, addPhotoHouse, avatar, renderHouse };
