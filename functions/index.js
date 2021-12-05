const admin = require("firebase-admin");


admin.initializeApp();

module.exports = {
  ...require("./generateRoom"),
  ...require("./updateRoom"),
  ...require("./createPost"),
  ...require("./updatePost"),
};
