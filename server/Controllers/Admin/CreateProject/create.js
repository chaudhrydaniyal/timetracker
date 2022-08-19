const Projects = require("../../../Models/Admin/CreateProject/projects");
const { createError } = require("../../../Utils/Error/error");

//only admin can add
const AddProject = async (req, res, next) => {
  try {
    const add = new Projects({
      projectname: req.body.projectname,
      description: req.body.description,
      assignto: req.body.assignTo,
      datestart: req.body.datestart,
      deadline: req.body.deadline,
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


    const update =  await Projects.findByIdAndUpdate(
      req.params.id,
      { $push: { assignto: req.body.assignto } },
      { new: true, useFindAndModify: false }
    );


    // const find = await Projects.findById(req.params.id);
    // console.log(find)


    // if (!find) {
    //   next(createError(404, "project not found"));
    // }


    // console.log( 
    //   find.assignto.indexOf(req.body.assignto))
    // if (find.assignto.length > 0){
    //   find.assignto.indexOf(req.body.assignto) >= 0 &&   console.log("already exists")
    //   find.assignto.indexOf(req.body.assignto) === -1 &&  find.assignto.push(req.body.assignto);
    // }else{
    //   find.assignto.push(req.body.assignto);
    // }
   

    // const update = await Projects.updateOne(
    //   { _id : req.params.id },
    //   { $addToSet: { assignto: req.body.assignto } },

    //   {}
      
    //   );

    update && res.status(200).json({ message: "success", update });


  } catch (error) {

    next(error);
  
  }

};


///single 


const single = async(req,res,next) =>{
      try{
             const finduser  = await Projects.find({assignto:req.params.id});
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
    const get = await Projects.find().populate("assignto").exec();
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
