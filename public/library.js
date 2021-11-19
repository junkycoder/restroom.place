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

/**
 * source: https://stackoverflow.com/a/494348/13890034
 * @param {String} htmlString
 * @returns
 */
export function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

export function getUrlParam(paramName, urlStr = window.location.href) {
  const url = new URL(urlStr);
  const urlParams = new URLSearchParams(url.search);
  return urlParams.get(paramName);
}
