/**
 * If doesn't work, try this: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
 * @returns {Boolean}
 */
export function hasTouchScreen() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}

/**
 * URL's pathname has to start with "/room"
 * @param {String} strUrl
 * @returns
 */
export function parseRoomIdFromUrl(strUrl) {
  if (!strUrl) strUrl = window.location.href;
  try {
    const url = new URL(strUrl);
    const [prefix, id] = url.pathname.split("/").filter(Boolean);
    if (prefix !== "room") new Error("Not a room URL");
    return id;
  } catch (e) {
    debugger;
    return null;
  }
}

export function isLocalhost() {
  const url = new URL(import.meta.url);
  return url.hostname === "localhost";
}
