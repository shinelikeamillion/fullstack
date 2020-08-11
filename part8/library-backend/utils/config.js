require("dotenv").config();

const { MONGODB_URI, NODE_ENV, MONGODB_URI_TEST, SECRET } = process.env;

module.exports = {
  DB_URI: NODE_ENV === "test" ? MONGODB_URI_TEST : MONGODB_URI,
  SECRET,
};
