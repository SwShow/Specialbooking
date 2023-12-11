import {addedData} from './preview.js';
import {fetchData} from './api.js';

const LAT = 35.681729;
const LNG = 139.753927;

const mapCanvas = document.querySelector('#map-canvas');
const address = document.querySelector('#address');
address.value = `lat: ${LAT}, lng: ${LNG}`;

/* global L:readonly */
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

const markerGroup = L.layerGroup().addTo(map);

const showMarker = (elem) => {

  const marker = L.marker(
    {
      lat: +(elem.location.lat),
      lng: +(elem.location.lng),
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
    .addTo(markerGroup)
    .bindPopup(addedData(elem));
};

fetchData((data) => {
  data.forEach((elem) => {
    showMarker(elem);
  });
});



