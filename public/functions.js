import { app } from "/application.js";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-functions.js";
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

export async function createPost({ roomId, text }) {
  return httpsCallable(functions, "createPost")({ roomId, text });
}

export async function updatePost({
  roomId,
  text,
  postId,
  forceDelete = false,
}) {
  return httpsCallable(
    functions,
    "updatePost"
  )({ roomId, text, postId, forceDelete });
}
