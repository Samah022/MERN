const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;