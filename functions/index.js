const functions = require("firebase-functions");
const qrcode = require("qrcode");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.generateRoom = functions.https.onCall(async(data, context) => {
  const id = "fok";
  const roomUrl = `https://restroom.place/room/${id}`;
  console.log(await qrcode.toDataURL(roomUrl));
});
