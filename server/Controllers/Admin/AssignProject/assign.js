const assignProject = require('../../../Models/Admin/AssignProject/assignProject');
const {createError}= require('../../../Utils/Error/error');


//only admin can add
const AssignProject  = async(req,res,next) =>{

    try{
          const save = new assignProject({
            selectProject:req.body.selectProject,
            assignTo:req.body.assignTo,
            assignBy:req.body.assignBy,
            assignDate:req.body.assignDate
          })
         save && res.status(200).json({message:"Sucessfully Assign",save}) 
    }
    catch(error){
       console.log("error assigning project",error);
       next(error)
    }
}

//only admin can access

const getAll  = async(req,res,next)=>{
    try{
        const get  = await assignProject.find();
        get && res.status(200).json({message:"All assigned Projects",get})
        }catch(error){
           next(error)
    }
}


module.exports ={
    getAll,
    assignProject
}