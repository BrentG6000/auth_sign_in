const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/auth_sign_in";

try {
  mongoose.connect(
    mongoDB,
    { useNewUrlParser: true, useUnifiedTopology: true, } // Gets rid of deprecation warnings
  );
} catch (error) {
  console.log(error)
};

module.exports = mongoose.connection;