const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  fname: { type: String },
  lname: { type: String },
  email: { type: String },
  password: { type: String }
});

/* the pre method runs before an event, in this case "save". The second argument is a function that
runs before that event happens. In this case the password element is changed to its hashed version
before being saved to the database. */
UserSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this._doc.password, 10)
  next();
});

const User = model("User", UserSchema);
module.exports = User;