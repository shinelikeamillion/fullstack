const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: true,
    minlength: [2, "title must be at least 2 characters long"],
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [{ type: String }],
});

schema.plugin(uniqueValidator, {
  message: "This boo already exists",
});

module.exports = mongoose.model("Book", schema);
