const Projects = require("../../../Models/Admin/CreateProject/projects");
const { createError } = require("../../../Utils/Error/error");

//only admin can add
const AddProject = async (req, res, next) => {
  try {
    const add = new Projects({
      projectname: req.body.projectname,
      description: req.body.description,
      assignTo: req.body.assignTo,
      dateCreated: req.body.dateCreated,
      deadline: req.body.deadline,
      projectStartDate: req.body.projectStartDate,
      projectEndDate: req.body.projectEndDate,
      allocatedWorkingDays: req.body.allocatedWorkingDays
    });
    const response = await add.save();
    response && res.status(200).json({ message: "success", response });
  } catch (error) {
    console.log("error creating project", error);
    next(error);
  }
};

//assign a project

const assign = async(req,res,next) =>{
   try{
         const find = await Projects.findById(req.params.id)
         
   }catch(error){
    next(error)
   }
}
const updateProject = async (req, res, next) => {
  
  try {

    return Projects.findByIdAndUpdate(
      req.params.id,
      { $push: { assignTo: req.body.assignTo } },
      { new: true, useFindAndModify: false }
    );

  } catch (error) {

    next(error);
  
  }

};


///single 


const single = async(req,res,next) =>{
      try{
             const finduser  = await Projects.find({assignTo:req.params.id});
             if(!finduser){
              next(createError(404,"not found"))
             }
            //  await finduser.find();
             res.status(200).json({message:"success",finduser})
      }catch(error){
         next(error)
      }
}
//only admin can access

const getAll = async (req, res, next) => {
  try {
    const get = await Projects.find().populate("assignTo").exec();
    get && res.status(200).json({ message: "All Projects", get });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddProject,
  getAll,
  updateProject,
  single
};
