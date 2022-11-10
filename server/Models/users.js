
const mongoose = require("mongoose");

const user = mongoose.model(
  "user",
  new mongoose.Schema({
    username: String,
    password: String,
    role:String,
    isAdmin:Boolean,
    currentProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
      }
    ]
  })
);

module.exports = user;
