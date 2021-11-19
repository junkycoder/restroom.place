import { app } from "/application.js";
import {
  getStorage,
  ref,
  uploadBytes,
  connectStorageEmulator,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js";
import { isLocalhost } from "/library.js";

export const storage = getStorage();

if (isLocalhost()) {
  connectStorageEmulator(storage, "localhost", 8088);
}

export async function uploadProfilePicture({ roomId, file }) {

  const [name, ext] = file.name.split(".");
  console.log(name, ext);
  const storageRef = ref(storage, `public/rooms/${roomId}/profile.${ext}`);

  const snapshot = await uploadBytes(storageRef, file);
  console.log("Uploaded a blob or file!", snapshot);

  return await getDownloadURL(storageRef);
}
