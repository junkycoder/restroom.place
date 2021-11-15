import { app } from "/application.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-functions.js";

export const functions = getFunctions(app);

export async function generateRoom({ roomId }) {
  return httpsCallable(functions, "generateRoom")({ roomId });
}
