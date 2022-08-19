const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
    },
    department: {
      type: String,
    },
    joiningdate: {
      type: String,
    },
    profilepic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
