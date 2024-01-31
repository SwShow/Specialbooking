import {addedData} from './preview.js';
import {fetchData} from './api.js';

const LAT = 35.681729;
const LNG = 139.753927;
const MAP_ZOOM = 13;
const MARKER_ICON_SIZE = [52, 52];
const MARKER_ICON_ANCHOR = [26, 52];
const mapCanvas = document.querySelector('#map-canvas');
const address = document.querySelector('#address');
address.value = `lat: ${LAT}, lng: ${LNG}`;

/* global L:readonly */
const map = L.map(mapCanvas);

const primaryMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: L.icon({
      iconUrl: './leaflet/img/main-pin.svg',
      iconSize: MARKER_ICON_SIZE,
      iconAnchor: MARKER_ICON_ANCHOR,
    }),
  },
);

// -- инициализация карты
const initMap = () => {
  map.setView({
    lat: LAT,
    lng: LNG,
  }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  // -- отрисовка главного маркера на карте
  primaryMarker.on('drag', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    address.value = `lat: ${lat.toFixed(6)}, lng: ${lng.toFixed(6)}`;
  });
  primaryMarker.addTo(map);
};

const markerGroup = L.layerGroup();

// -- отрисовка полученных данных на карте
const showGroupMarker = () => {
  markerGroup.clearLayers();
  markerGroup.addTo(map);
  const showMarker = (elem) => {
    const marker = L.marker(
      {
        lat: +(elem.location.lat),
        lng: +(elem.location.lng),
      },
      {
        icon: L.icon({
          iconUrl: './leaflet/img/pin.svg',
          iconSize: MARKER_ICON_SIZE,
          iconAnchor: MARKER_ICON_ANCHOR,
        }),
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(addedData(elem));
  };
  // -- запрос данных со стороннего сайта
  fetchData((data) => {
    data.forEach((elem) => {
      showMarker(elem);
    });
  });
};

// -- сброс карты к первоначальному значению
const resetMap = () => {
  map.setView({
    lat: LAT,
    lng: LNG,
  }, MAP_ZOOM);
  primaryMarker.setLatLng({
    lat: LAT,
    lng: LNG,
  });
  map.closePopup();
  address.value = `lat: ${LAT}, lng: ${LNG}`;
};

export { resetMap, initMap, showGroupMarker };
