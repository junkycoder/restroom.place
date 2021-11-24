/* */

import { hasTouchScreen } from "./library.js";

const checkTouchScreen = () => {
  if (!hasTouchScreen()) {
    document.body.classList.add("no-touch");
    document.body.innerText = "This app is not supported on your device.";
  }
};
setTimeout(checkTouchScreen, 0);
window.document.addEventListener("DOMContentLoaded", checkTouchScreen);


/* */

import {
  isMagicLink,
  confirmMagicLink,
  isCurrentUserVerified,
  signInAnonymously,
} from "/authentication.js";


document.addEventListener("auth-changed", async ({ detail: user }) => {
  if (isCurrentUserVerified()) return;

  try {
    if (isMagicLink()) {
      await confirmMagicLink();
      window.location.search = "";
    } else if (!user) {
      console.log("dok");
      await signInAnonymously();
    }
  } catch (error) {
    console.error(error);

    if (error.code === "auth/invalid-action-code") {
      alert("Neplatný odkaz, zkuste to znovu.");

      window.location.href = `/user/verify-self?destination=${encodeURIComponent(
        wiondow.location.pathname
      )}`;
    } else {
      alert("Nastala chyba.");
    }
  }
});
