import { app } from "/application.js";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { isLocalhost } from "/library.js";

export const auth = getAuth(app);

export let currentUser = (window.currentUser = auth.currentUser);

console.time("User load");
onAuthStateChanged(auth, (user) => {
  console.info("Auth changed", user);
  window.currentUser = currentUser = user;
  console.timeEnd("User load");
});

/**
 * Use only in async handlers, this tooks a while to load
 * @returns {Promise<void>}
 */
export async function isCurrentUserVerified() {
  return currentUser && currentUser.emailVerified === true;
}

export async function sendMagicLink({
  email,
  domain = isLocalhost() ? "localhost:5000" : "restroom.place",
  protocol = isLocalhost() ? "http" : "https",
  destination = "/",
} = {}) {
  const url = `${protocol}://${domain}${destination || ""}`;
  console.info(`Sending magic link to ${email}`, url);

  if (!email) throw new Error("Email is required");
  const settings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url,
    // This must be true.
    handleCodeInApp: true,
  };

  await sendSignInLinkToEmail(auth, email, settings);
  window.localStorage.setItem("emailForSignIn", email);
}

export function isMagicLink(link) {
  return isSignInWithEmailLink(auth, link || window.location.href);
}

export async function confirmMagicLink(link) {
  if (!link) link = window.location.href;

  if (!isMagicLink(link)) {
    throw new Error("Not a magic link");
  }

  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  let email = window.localStorage.getItem("emailForSignIn");
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt("Prosím doplňte e-mail pro potvrzení.");
    if (email) window.localStorage.setItem("emailForSignIn", email);
  }
  // The client SDK will parse the code from the link for you.
  const result = await signInWithEmailLink(auth, email, link);
  console.info("Signed in user with result", result);

  // Clear email from storage.
  window.localStorage.removeItem("emailForSignIn");
  // You can access the new user via result.user
  // Additional user info profile not available via:
  // result.additionalUserInfo.profile == null
  // You can check if the user is new or existing:
  // result.additionalUserInfo.isNewUser
}
