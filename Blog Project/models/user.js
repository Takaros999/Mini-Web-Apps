const mongoose = require("mongoose");
const Blog = require("./blog.js");
const Schema = mongoose.Schema;

// to be continued
const userSchema = new Schema({
  username: {
    type: "string",
    required: true,
		unique:true
  },
  password: {
    type: "string",
    required: true
  }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
