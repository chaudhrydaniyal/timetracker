const mongoose = require("mongoose")
const taskSchema = mongoose.Schema({

   date:{
      type:String,
   },
   title:{
    type:String,
   },
   description:{
    type:String
   },
   startTime:{
      type:String
   },
   endTime:{
      type:String
   },
   // selectProject:{
   //  type:mongoose.Schema.Types.ObjectId,
   //  ref:'Projects'
   // },
   // addedby:{
   //    type:mongoose.Schema.Types.ObjectId,
   //    ref:'Users'
   // },

},{timestamps:true},)

const Tasks = mongoose.model("Tasks",taskSchema);
module.exports = Tasks;