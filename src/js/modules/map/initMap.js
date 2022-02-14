import GoogleMapsApi from './GoogleMapsApi.js';
import { styles } from './styles.js';

const initMap = (mapSelector) => {
  const element = document.getElementById(mapSelector);
  const map = new google.maps.Map(element, {
    zoom: 10,
    center: {
      lat: 50.2679361,
      lng: 28.6386982
    },
    styles: styles
  });

  const marker = new google.maps.Marker({
    position: {
      lat: 50.2630256,
      lng: 28.6594693
    },
    map: map,
    // icon: '../img/marker.svg',
  });
}

const gApiKey = 'AIzaSyC2Zq7VBtQJJ41xXy6EuxQoQm0k5J31zBw';
const gmapApi = new GoogleMapsApi(gApiKey);
gmapApi.load().then(() => {
  initMap('map')
});