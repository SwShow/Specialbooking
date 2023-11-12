//import {arrays} from './util.js';
import {addedData} from './preview.js';
//import {backData} from './api.js';

const LAT = 35.681729;
const LNG = 139.753927;
/* global L:readonly */
const mapCanvas = document.querySelector('#map-canvas');
const address = document.querySelector('#address');
address.value = `lat: ${LAT}, lng: ${LNG}`;
const map = L.map(mapCanvas)
  .setView({
    lat: LAT,
    lng: LNG,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//const data = arrays();
const primaryMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: L.icon({
      iconUrl: './leaflet/img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    }),
  },
).addTo(map);

primaryMarker.on('drag', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `lat: ${lat.toFixed(6)}, lng: ${lng.toFixed(6)}`;
});

const posting = (el) => {
  const marker = L.marker(
    {
      lat: +(el.location.lat),
      lng: +(el.location.lng),
    },
    {
      icon: L.icon({
        iconUrl: './leaflet/img/pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      }),
    },
  );

  marker
    .addTo(map)
    .bindPopup(addedData(el),
      {
        keepInView: true,
      },
    );
};


