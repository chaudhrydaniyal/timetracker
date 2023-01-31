const projectphases = require("./../Models/ProjectPhases");
const { createError } = require("../Utils/Error/error");

//only admin can add
const AddPhase = async (req, res, next) => {
  try {
    
    const add = new projectphases({
      phase: req.body.phase,
      ExpectedStartDate: req.body.ExpectedStartDate,
      ExpectedEndDate: req.body.ExpectedEndDate,
      project: req.body.project,
    });

    const response = await add.save();
    response && res.status(200).json({ message: "success", response });
  } catch (error) {
    console.log("error creating project", error);
    next(error);
  }
};




//  phases of single project 


const getPhases = async (req, res, next) => {
  try {
    const phases = await projectphases.find({ project: req.params.id });
    if (!phases) {
      next(createError(404, "not found"))
    }
    res.status(200).json({ message: "success", phases })
  } catch (error) {
    next(error)
  }
}



const DeletePhase = async (req, res, next) => {
  try {

      const deletePhase = await projectphases.deleteOne({ _id: req.params.id });

      deletePhase && res.status(200).json({ message: "Sucessfully deleted project", deletePhase })
  }
  catch (error) {
      console.log("error adding task", error);
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
  AddPhase,
  getPhases,
  updateProject,
  single,
  EditProject,
  DeletePhase
};
