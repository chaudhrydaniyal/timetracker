const mongoose = require('mongoose')
const projectSchema =  new mongoose.Schema({

    projectname:{
        type:String,
        unique:true
    },
    description:{
        type:String
    },
    assignto:[{type:mongoose.Schema.Types.ObjectId, ref: 'Users' }]
    ,
    datestart:{
        type:String
    },
    deadline:{
        type:String
    }
},{timestamps:true},)

const Projects = mongoose.model('Projects',projectSchema);
module.exports = Projects