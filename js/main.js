import './move.js';
import { initMap/*, showGroupMarker*/ } from'./map.js';
import { addMapHouse, formDisabled, formEnabled } from './ad-form.js';

formDisabled();
initMap();
//showGroupMarker();
addMapHouse();
formEnabled();
