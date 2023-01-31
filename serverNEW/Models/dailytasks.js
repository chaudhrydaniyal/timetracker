const mongoose = require("mongoose")
const taskSchema = mongoose.Schema({

   date: {
      type: Date,
   },
   title: {
      type: String,
   },
   description: {
      type: String
   },
   startTime: {
      type: String
   },
   endTime: {
      type: String
   },
   selectProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'projects'
   },
   addedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },
   projectPhase: {
      type: String
   },
   status: {
      type: String
   },
   remarks:{
      type: String
   }


}, { timestamps: true },)

const Tasks = mongoose.model("Tasks", taskSchema);
module.exports = Tasks;