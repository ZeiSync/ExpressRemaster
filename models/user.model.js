/** @format */

const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

userSchema.index({ name: "text" });
let User = mongoose.model("User", userSchema, "users");

module.exports = User;
