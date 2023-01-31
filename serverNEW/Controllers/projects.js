const Projects = require("../Models/Projects");
const { createError } = require("../Utils/Error/error");

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
      allocatedWorkingDays: req.body.allocatedWorkingDays,
      supervisor:req.body.supervisor

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


// Assigns project to user
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



const EditProject = async (req, res, next) => {
  try {
      const EditProject = await Projects.findOneAndUpdate({ _id: req.body._id }, {
        projectname: req.body.projectname,
        description: req.body.description,
        assignTo: req.body.assignTo,
        dateCreated: req.body.dateCreated,
        deadline: req.body.deadline,
        projectStartDate: req.body.projectStartDate,
        projectEndDate: req.body.projectEndDate,
        allocatedWorkingDays: req.body.allocatedWorkingDays
      })
      //   await addtask.save()
      EditProject && res.status(200).json({ message: "Sucessfully Added task", EditProject })
  }
  catch (error) {
      console.log("error adding task", error);
      next(error)
  }
}


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


// //only admin can access

// const getAll = async (req, res, next) => {
//   try {
//     const get = await Projects.find({supervisor:req.params.id}).populate("assignTo").exec();
//     get && res.status(200).json({ message: "All Projects", get });
//   } catch (error) {
//     next(error);
//   }
// };



//only admin can access

const getAll = async (req, res, next) => {
  try {
    const get = await Projects.find({
      $or: [{
        supervisor: req.params.id
      },
      {
        assignTo: req.params.id
      },
      ]

    }).populate("assignTo").exec();
    get && res.status(200).json({ message: "All Projects", get });
  } catch (error) {
    next(error);
  }
};



//view current user projects

const userProjects = async (req, res, next) => {
  try {
    const get = await Projects.find({assignTo:req.params.id}).populate("assignTo").exec();
    get && res.status(200).json({ message: "All Projects", get });
  } catch (error) {
    next(error);
  }
};




const DeleteProject = async (req, res, next) => {
  try {

      const deleteProject = await Projects.deleteOne({ _id: req.params.id });

      deleteProject && res.status(200).json({ message: "Sucessfully deleted project", deleteProject })
  }
  catch (error) {
      console.log("error adding task", error);
      next(error)
  }
}

module.exports = {
  AddProject,
  getAll,
  updateProject,
  single,
  EditProject,
  DeleteProject,
  userProjects
};
