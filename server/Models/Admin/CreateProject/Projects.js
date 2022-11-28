const mongoose = require("mongoose");

const projects = mongoose.model(
  "projects",
  new mongoose.Schema({

    projectname: String,
    description: String,
    dateCreated: String,
    projectStartDate: Date,
    projectEndDate: Date,
    allocatedWorkingDays: Number,

    assignTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ],
    supervisor: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ,

  }, { timestamps: true })

);

module.exports = projects;
