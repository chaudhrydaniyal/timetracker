const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({

    projectname:{
        type:String
    },
    description:{
        type:String
    },
    assignto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    datestart:{
        type:Date
    },
    deadline:{
        type:Date
    }
},{timestamps:true},)

const Projects = mongoose.model('Projects',projectSchema);
module.exports = Projects