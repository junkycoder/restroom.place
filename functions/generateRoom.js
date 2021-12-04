const functions = require("firebase-functions");
const admin = require("firebase-admin");

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
exports.generateRoom = functions
  .runWith({
    minInstances: 1,
  })
  .https.onCall(async ({ roomId }, context) => {
    const roomUrl = createRoomLink(roomId);

    if (!context.auth || !context.auth.token.email_verified) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    const db = admin.firestore();
    const ref = db.doc(`rooms/${roomId}`);
    const profileRef = db.doc(`rooms/${roomId}/public/profile`);

    return db.runTransaction(async (transaction) => {
      const doc = await transaction.get(ref);

      if (doc.exists) {
        throw new functions.https.HttpsError(
          "already-exists",
          "The room already exists."
        );
      }

      await transaction.create(ref, {
        id: roomId,
        creatorId: context.auth.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      await transaction.create(profileRef, {
        roomId,
        initialized: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return "Hotovson";
    });
  });
