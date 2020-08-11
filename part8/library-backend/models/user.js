const mongoose = require("mongoose");

const scheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: String,
});

module.exports = mongoose.model("User", scheme);
