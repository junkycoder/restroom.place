const functions = require("firebase-functions");
const marked = require("marked");
const admin = require("firebase-admin");

/**
 * Create post
 */
exports.createPost = functions.https.onCall(
  async ({ roomId, text }, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    if (!roomId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a valid roomId."
      );
    }

    if (!text) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a valid text."
      );
    }

    const db = admin.firestore();
    const ref = db.collection(`rooms/${roomId}/posts`).doc();
    const uref = db.collection(`users/${context.auth.uid}/posts`).doc();

    return db.runTransaction(async (transaction) => {
      const doc = await transaction.get(ref);
      const createdAt = admin.firestore.FieldValue.serverTimestamp();

      await transaction.create(ref, {
        text,
        html: marked.parse(text),
        createdAt,
      });

      await transaction.create(uref, {
        roomId,
        postId: ref.id,
        createdAt,
      });
    });
  }
);
