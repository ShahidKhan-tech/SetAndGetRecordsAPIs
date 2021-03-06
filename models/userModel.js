const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true},
  displayName: { type: String },
});

module.exports = User = mongoose.model("user", userSchema);
