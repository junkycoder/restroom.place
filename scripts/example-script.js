const { initizeFirebaseAdmin } = require("./library");

const admin = initizeFirebaseAdmin();

async function main() {
  // const snapshot = await admin.firestore().collection("neco").get();

  // const urls = snapshot.docs.map(
  //   (doc) => `https://restroom.place/room/${doc.id}`
  // );



  // const batch = admin.firestore().batch();

  // for (let index = 0; index < snapshot.docs.length; index++) {
  //   const doc = snapshot.docs[index];
  //   batch.update(doc.ref, {
  //     qr: svgs[index],
  //   });
  // }

  // await batch.commit();
}

main().catch(console.error);
