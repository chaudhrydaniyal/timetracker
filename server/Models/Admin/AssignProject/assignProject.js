const mongoose = require("mongoose")
const assignprojectSchema = mongoose.Schema({

   selectProject:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Projects'
   },
   assignTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
   },
   assignBy:{
    references: { type: [Schema.Types.ObjectId], refPath: 'Users' },
   },
   assignDate:{
    type:Date
   },

},{timestamps:true},)

const assignProject = mongoose.model("assignProject",assignprojectSchema);
module.exports = assignProject;