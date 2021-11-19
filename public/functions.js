import { app } from "/application.js";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-functions.js";
import { isLocalhost } from "/library.js";

export const functions = getFunctions(app);

if (isLocalhost()) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export async function generateRoom({ roomId }) {
  return httpsCallable(functions, "generateRoom")({ roomId });
}

export async function updateRoom({ roomId, name, bio, picture }) {
  return httpsCallable(functions, "updateRoom")({ roomId, name, bio, picture });
}