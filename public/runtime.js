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

/* Authentication error propagation */
import "/authentication.js";

document.addEventListener("user-error", async ({ detail: error }) => {
  console.error(error);

  if (error.code === "auth/invalid-action-code") {
    alert("Neplatný odkaz, zkuste to znovu.");

    window.location.href = `/user/verify-self?destination=${encodeURIComponent(
      window.location.pathname
    )}`;
  } else {
    alert("Nastala chyba.");
  }
});

/* Polify */
import "https://unpkg.com/long-press-event@2.4.4/src/long-press-event.js?module";
