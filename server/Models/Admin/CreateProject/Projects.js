const mongoose = require("mongoose")
const projectSchema = mongoose.Schema({

    projectname:{
        type:Array,
        require:true,
        unique:true 
    },
   
    datestart:{
        type:Date,
        require:true
    },
    deadline:{
       type:Date,
       require:true
    }
},{timestamps:true},)

const Project = mongoose.model("Projects",projectSchema);
module.exports = Project;