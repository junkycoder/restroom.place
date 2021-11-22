import { app } from "/application.js";
import {
  getStorage,
  ref,
  uploadBytes,
  connectStorageEmulator,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js";
import { isLocalhost } from "/library.js";

export const storage = getStorage();

if (isLocalhost()) {
  connectStorageEmulator(storage, "localhost", 8088);
}

export async function uploadProfilePicture({ roomId, file }) {
  const [name, ext] = file.name.split(".");
  const storageRef = ref(storage, `public/rooms/${roomId}/profile.${ext}`);

  await uploadBytes(storageRef, file);
}

export async function getRoomProfilePictureUrl(roomId) {
  try {
    const storageRef = ref(
      storage,
      `public/rooms/${roomId}/profile${
        isLocalhost() ? ".jpg" : "_420x420.jpeg"
      }`
    );
    return await getDownloadURL(storageRef);
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      return null;
    }
    console.error(error);
  }
}
