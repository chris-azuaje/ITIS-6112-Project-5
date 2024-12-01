// "use strict";

const mongoose = require("mongoose");

// Define the Mongoose Schema for a Comment.
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  location: String,
  description: String,
  occupation: String,
  login_name: String,
  favorites: [mongoose.Schema.Types.ObjectId],
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
