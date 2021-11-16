const functions = require("firebase-functions");
const qrcode = require("qrcode");

const PROCTION_DOMAIN = "restroom.place";

function isEmulation() {
  return process.env.FUNCTIONS_EMULATOR === "true";
}

function createRoomLink(roomId) {
  return isEmulation()
    ? `http://localhost:5000/room/${roomId}`
    : `https://${PROCTION_DOMAIN}/room/${roomId}`;
}

/**
 * Generates a QR code and a room wildcard.
 */
exports.generateRoom = functions.https.onCall(async ({ roomId }, context) => {
  const roomUrl = createRoomLink(roomId);

  // check user is verified
  // check room id is not taken
  // create QR code
  const qr = await qrcode.toDataURL(roomUrl);
  // create room (wildcard) only with id, qr code and creatorId

  return qr;
});
