import { app } from "/application.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

export const db = getFirestore(app);
