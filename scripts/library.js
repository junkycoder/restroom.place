const admin = require("firebase-admin");
const config = require("./config");

function initizeFirebaseAdmin() {
  const account = require(`../firebase-adminsdk.json`);

  admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: config.databaseURL,
    projectId: config.projectId
  });

  return admin;
}

module.exports = { initizeFirebaseAdmin };
