/**
 */

import { hasTouchScreen } from "./library.js";

const checkTouchScreen = () => {
  if (!hasTouchScreen()) {
    document.body.classList.add("no-touch");
    document.body.innerText = "This app is not supported on your device.";
  }
};
setTimeout(checkTouchScreen, 0);
window.document.addEventListener("DOMContentLoaded", checkTouchScreen);
