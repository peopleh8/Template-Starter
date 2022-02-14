import * as flsFunctions from './modules/functions.js';
import AllahModal from './modules/modal.js'
// import setMask from './modules/mask.js';
// import formValidate from './modules/validation.js';
// import * as Map from './modules/map/initMap.js';

flsFunctions.isWebp();

window.addEventListener('resize', () => {
  flsFunctions.calculateMobileHeight();
});