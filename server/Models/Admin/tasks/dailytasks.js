const mongoose = require("mongoose")
const taskSchema = mongoose.Schema({

   date:{
      type:Date,
   },
   title:{
    type:String,
   },
   description:{
    type:String
   },
   selectProject:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Projects'
   },

},{timestamps:true},)

const Tasks = mongoose.model("Tasks",taskSchema);
module.exports = Tasks;