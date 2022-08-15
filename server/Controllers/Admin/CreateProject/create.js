const createProject = require('../../../Models/Admin/CreateProject/Projects');
const {createError}= require('../../../Utils/Error/error');

const AddProject  = async(req,res,next) =>{

    try{
          const save = new createProject({
            projectname:req.body.projectname,
            datestart:req.body.datestart,
            deadline:req.bo
          })
    }
    catch(error){

    }
}