const mongoose = require("mongoose")
const taskSchema = mongoose.Schema({

   date: {
      type: String,
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
   }

}, { timestamps: true },)

const Tasks = mongoose.model("Tasks", taskSchema);
module.exports = Tasks;