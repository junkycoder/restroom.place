import { getFunctions } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-functions.js";

export const functions = getFunctions(app);

export async function generateRoom({ roomId }) {
  return functions.httpsCallable("generateRoom")({ roomId });
}
