const mongoose = require("mongoose")
const projectSchema = mongoose.Schema({

    projectname:{
        type:String,
     
    },
    description:{
        type:String
    },
    datestart:{
        type:Date,
       
    },
    deadline:{
       type:Date,
 
    }
},{timestamps:true},)

const Project = mongoose.model("Projects",projectSchema);
module.exports = Project;