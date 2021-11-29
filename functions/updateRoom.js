const functions = require("firebase-functions");
const admin = require("firebase-admin");
const marked = require("marked");

const PROCTION_DOMAIN = "restroom.place";

// function isEmulation() {
//   return process.env.FUNCTIONS_EMULATOR === "true";
// }

/**
 * Updates room's public profile
 */
exports.updateRoom = functions.https.onCall(
  async ({ roomId, bio, name, picture }, context) => {
    if (!context.auth || !context.auth.token.email_verified) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Nejste ověřeno."
      );
    }

    const db = admin.firestore();
    const ref = db.doc(`rooms/${roomId}`);
    const profileRef = db.doc(`rooms/${roomId}/public/profile`);

    return db.runTransaction(async (transaction) => {
      const doc = await transaction.get(ref);
      const profileDoc = await transaction.get(profileRef);

      if (
        profileDoc.get("initialized") &&
        [doc.get("initializatorId"), doc.get("creatorId")].includes(
          context.auth.uid
        ) === false
      ) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "Na tohle nemáte právo."
        );
      }

      await transaction.update(ref, {
        initializatorId: context.auth.uid,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      await transaction.update(profileRef, {
        name,
        bio,
        html: marked.parse(bio),
        picture,
        initialized: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    });
  }
);
