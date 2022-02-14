/* Маска */
import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js";

const setMask = (selector, mask) => {
  let phoneFields = document.querySelectorAll(selector);
  let maskInstance = new Inputmask(mask);
  
  return maskInstance.mask(phoneFields);
}

export default setMask;

/* приклад */
setMask('input[type="tel"]', '+38(999) 999-99-99');