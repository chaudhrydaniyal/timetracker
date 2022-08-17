const Projects = require('../../../Models/Admin/CreateProject/projects')
const {createError}= require('../../../Utils/Error/error');


//only admin can add
const AddProject  = async(req,res,next) =>{

    try{
          const add = new Projects({
            projectname:req.body.projectname,
            description:req.body.description,
            assignto:req.body.assignTo,
            datestart:req.body.datestart,
            deadline:req.body.deadline
          })
         const response = await add.save(); 
          response && res.status(200).json({message:"success",response})
    }
    catch(error){
       console.log("error creating project",error);
       next(error)
    }
}

//only admin can access

const getAll  = async(req,res,next)=>{
    try{
        const get  = await Projects.find().populate('assignto').exec()
        get && res.status(200).json({message:"All Projects",get})
        }catch(error){
           next(error)
    }
}


module.exports ={
    AddProject,
    getAll
}