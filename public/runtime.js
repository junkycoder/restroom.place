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

import {
  isMagicLink,
  confirmMagicLink,
  isCurrentUserVerified,
} from "/authentication.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    if (isMagicLink()) {
      await confirmMagicLink();
      window.location.search = "";
    }
  } catch (error) {
    console.error(error);

    if (error.code === "auth/invalid-action-code") {
      alert("Neplatný odkaz, zkuste to znovu.");

      window.location.href = `/verify-self?destination=${encodeURIComponent(
        wiondow.location.pathname
      )}`;
    } else {
      alert("Nastala chyba.");
    }
  } finally {
    console.timeEnd("User verification");
  }
});
