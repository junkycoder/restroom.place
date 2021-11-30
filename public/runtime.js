/* Force mobile view */

import { hasTouchScreen } from "./library.js";

const checkTouchScreen = () => {
  if (!hasTouchScreen()) {
    document.body.classList.add("no-touch");
    document.body.classList.add("mobile-viewport");
  }
};
setTimeout(checkTouchScreen, 0);
window.document.addEventListener("DOMContentLoaded", checkTouchScreen);


/* Authenticate */

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

/* Polify */
import "https://unpkg.com/long-press-event@2.4.4/src/long-press-event.js?module";