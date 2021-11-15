import { app } from "/application.js";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  sendSignInLinkToEmail,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

export const auth = getAuth(app);

export function isCurrentUserVerified() {
  return auth.currentUser?.emailVerified;
}

export async function sendMagicLink({
  email,
  domain = "restroom.place",
  destination = "/",
} = {}) {
  const url = `https://${domain}${destination}`;
  console.info(`Sending magic link to ${email}`, url);

  if (!email) throw new Error("Email is required");
  const settings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url,
    // This must be true.
    handleCodeInApp: true,
  };

  await sendSignInLinkToEmail(auth, email, settings)
  window.localStorage.setItem("emailForSignIn", email);
}
