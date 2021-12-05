const functions = require("firebase-functions");
const admin = require("firebase-admin");
const marked = require("marked");

/**
 * Update (or delete) post if room creator, initializator or post author.
 */
exports.updatePost = functions.https.onCall(
  async ({ roomId, postId, text, forceDelete }, context) => {
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

    if (!postId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a valid postId."
      );
    }

    const room = await admin.firestore().collection("rooms").doc(roomId).get();
    const isRoomManager = [
      room.get("creatorId"),
      room.get("initializatorId"),
    ].includes(context.auth.uid);

    if (!room.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "The room does not exist."
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


      if (!udoc.exists && !isRoomManager) {
        throw new functions.https.HttpsError(
          "permission-denied",
          "Zamítám. Nejste autorem, ani správcem místnosti."
        );
      }

      const updatedAt = admin.firestore.FieldValue.serverTimestamp();
      const post = {
        text,
        html: marked.parse(text),
        updatedAt,
      };

      if (!text && forceDelete) {
        await transaction.delete(ref);
      } else {
        await transaction.update(ref, post);
      }

      // once room manager edits a post, we need to create new post under the manager's user collection
      await transaction[udoc.exists ? "update" : "create"](uref, {
        roomId,
        postId,
        updatedAt,
      });

      return { id: postId, ...post };
    });
  }
);
