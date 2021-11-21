import { app } from "/application.js";
import {
  getFirestore,
  collection,
  getDocs,
  connectFirestoreEmulator,
  doc,
  getDoc,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import { isLocalhost } from "/library.js";
import "/authentication.js";

export const db = getFirestore(app);

if (isLocalhost()) {
  connectFirestoreEmulator(db, "localhost", 8080);
}

// enableIndexedDbPersistence

export async function getDocData(path) {
  const snap = await getDoc(doc(db, path));
  return snap.data();
}

export async function getCollectionData(path) {
  const q = query(collection(db, path), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => doc.data());
}
