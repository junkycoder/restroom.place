const functions = require("firebase-functions");
const admin = require("firebase-admin");

/**
 * Delete post if user is admin, creator, initializer or author
 */
exports.deletePost = functions.https.onCall(async ({ postId }, context) => {
  if (!context.auth || !context.auth.token.email_verified) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  if (!postId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a valid postId."
    );
  }

  const db = admin.firestore();
  const ref = db.doc(`rooms/${roomId}/posts/${postId}`);
  const uref = db.doc(`users/${context.auth.uid}/posts/${postId}`);

  return db.runTransaction(async (transaction) => {
    const doc = await transaction.get(ref);
    const udoc = await transaction.get(uref);

    if (!doc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "The post does not exist."
      );
    }

    if (doc.exists && !udoc.exists) {
      throw new functions.https.HttpsError(
        "forbidden",
        "The post does not belong to you."
      );
    }

    const deletedAt = admin.firestore.FieldValue.serverTimestamp();

    await transaction.delete(ref);

    await transaction.update(uref, {
      roomId,
      postId: ref.id,
      deletedAt,
    });

    return post;
  });
});
