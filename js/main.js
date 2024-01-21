import './move.js';
import { initMap, showGroupMarker } from'./map.js';
import { addMapHouse, formDisabled, formEnabled } from './ad-form.js';
import { addAvatar, addPhotoHouse } from './ad-foto.js';

formDisabled();
initMap();
showGroupMarker();
addMapHouse();
formEnabled();
addAvatar();
addPhotoHouse();
