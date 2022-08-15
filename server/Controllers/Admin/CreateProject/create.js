const Project = require('../../../Models/Admin/CreateProject/Projects');
const {createError}= require('../../../Utils/Error/error');


//only admin can add
const AddProject  = async(req,res,next) =>{

    try{
          const add = new Project({
            projectname:req.body.projectname,
            description:req.body.description,
            datestart:req.body.datestart,
            deadline:req.body.deadline
          })
         add && await add.save();
          res.status(200).json({message:"success",save})
    }
    catch(error){
       console.log("error creating project",error);
       next(error)
    }
}

//only admin can access

const getAll  = async(req,res,next)=>{
    try{
        const get  = await Project.find();
        get && res.status(200).json({message:"All Projects",get})
        }catch(error){
           next(error)
    }
}


module.exports ={
    AddProject,
    getAll
}