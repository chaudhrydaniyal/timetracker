const mongoose = require("mongoose")
const assignprojectSchema = mongoose.Schema({

   selectProject:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Projects'
   },
   assignTo:{
      references: { type: [Schema.Types.ObjectId], refPath: 'Users' },
   },
   assignBy:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'Users'
   },
   assignDate:{
    type:Date
   },

},{timestamps:true},)

const assignProject = mongoose.model("assignProject",assignprojectSchema);
module.exports = assignProject;