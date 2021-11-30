import { app } from "/application.js";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  connectAuthEmulator,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { isLocalhost } from "/library.js";

export const auth = (window.auth = getAuth(app));

export const getCurrentUser = () => auth.currentUser;

if (isLocalhost()) {
  connectAuthEmulator(auth, "http://localhost:9099");
}

onAuthStateChanged(auth, async (user) => {
  console.info("User state changed", user);

  if (!user) {
    await signInAnonymously(auth);
    console.info("User signed anonymously");
    return;
  }

  try {
    if (!isCurrentUserVerified() && isMagicLink()) {
      await confirmMagicLink();
    }

    const eventName = isCurrentUserVerified()
      ? "user-verified"
      : "user-anonymous";

    event = new CustomEvent(eventName, { detail: user });
  } catch (error) {
    event = new CustomEvent("user-error", { detail: error });
  } finally {
    if (event) {
      console.info("Dispatching event", event);
      document.dispatchEvent(event);
    }
  }
});

/**
 * Use only in async handlers, this tooks a while to load
 * @returns {Promise<void>}
 */
export function isCurrentUserVerified(user) {
  if (!user) user = getCurrentUser();
  return Boolean(user && user.emailVerified);
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
    lang: "cs",
  };

  await sendSignInLinkToEmail(auth, email, settings);
  window.localStorage.setItem("emailForSignIn", email);
}

export function isMagicLink(link) {
  if (!link) link = window.location.href;
  console.info("Checking magic link", link);
  return isSignInWithEmailLink(auth, link);
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
