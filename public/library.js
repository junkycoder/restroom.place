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

/*!
 * Sanitize an HTML string
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String}          str   The HTML string to sanitize
 * @param  {Boolean}         nodes If true, returns HTML nodes instead of a string
 * @return {String|NodeList}       The sanitized string or nodes
 */
export function cleanHTML(str, nodes) {
  /**
   * Convert the string to an HTML document
   * @return {Node} An HTML document
   */
  function stringToHTML() {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");
    return doc.body || document.createElement("body");
  }

  /**
   * Remove <script> elements
   * @param  {Node} html The HTML
   */
  function removeScripts(html) {
    let scripts = html.querySelectorAll("script");
    for (let script of scripts) {
      script.remove();
    }
  }

  /**
   * Check if the attribute is potentially dangerous
   * @param  {String}  name  The attribute name
   * @param  {String}  value The attribute value
   * @return {Boolean}       If true, the attribute is potentially dangerous
   */
  function isPossiblyDangerous(name, value) {
    let val = value.replace(/\s+/g, "").toLowerCase();
    if (["src", "href", "xlink:href"].includes(name)) {
      if (val.includes("javascript:") || val.includes("data:text/html"))
        return true;
    }
    if (name.startsWith("on")) return true;
  }

  /**
   * Remove potentially dangerous attributes from an element
   * @param  {Node} elem The element
   */
  function removeAttributes(elem) {
    // Loop through each attribute
    // If it's dangerous, remove it
    let atts = elem.attributes;
    for (let { name, value } of atts) {
      if (!isPossiblyDangerous(name, value)) continue;
      elem.removeAttribute(name);
    }
  }

  /**
   * Remove dangerous stuff from the HTML document's nodes
   * @param  {Node} html The HTML document
   */
  function clean(html) {
    let nodes = html.children;
    for (let node of nodes) {
      removeAttributes(node);
      clean(node);
    }
  }

  // Convert the string to HTML
  let html = stringToHTML();

  // Sanitize it
  removeScripts(html);
  clean(html);

  // If the user wants HTML nodes back, return them
  // Otherwise, pass a sanitized string back
  return nodes ? html.childNodes : html.innerHTML;
}

export function randomRoomId() {
  return Math.random()
    .toString(36)
    .substring(2, 15);
}
