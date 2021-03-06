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
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
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

export async function getCollectionData(path, { dir = "asc" } = {}) {
  const q = query(collection(db, path), orderBy("createdAt", dir));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}
