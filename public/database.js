import { app } from "/application.js";
import {
  getFirestore,
  collection,
  getDocs,
  connectFirestoreEmulator,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import { isLocalhost } from "/library.js";

export const db = getFirestore(app);

if (isLocalhost()) {
  connectFirestoreEmulator(db, "localhost", 5001);
}
