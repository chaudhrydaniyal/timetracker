
const mongoose = require("mongoose");

const user = mongoose.model(
  "user",
  new mongoose.Schema({
    fullname: String,
    username: String,
    password: String,
    activeUser:Boolean,

    role:String,
    isAdmin:Boolean,
    currentProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
      }
    ],
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    companies:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:'Companies'
    },
   
  })

);

module.exports = user;
