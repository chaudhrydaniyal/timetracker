const User = require('../Models/users');
const { createError } = require('../Utils/Error/error')


//get a single user(both admin and user can access)

const singleUser = async (req, res, next) => {

  try {
    const find = await User.findById(req.body.id).populate('projects').exec();

    find && res.status(200).json({ message: "sucessfully found user", find })
  } catch (error) {
    console.log("Single user error", error)
    next(createError(404, "Unable to find User"))
  }
}



//delete specific user
const deleteUser = async (req, res, next) => {
  try {
    const find = await User.findByIdAndDelete(req.body)
    if (!find) {
      next(createError(404, "User not found"))
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}



//update a user
const updateUser = async (req, res, next) => {

  try {
    const find = await User.findById(req.body.id);
    console.log("find", find)
    if (!find) {
      next(createError(404, "User not found"))
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("update user error", err)
    next(err);
  }

}



//get All Employess (only access by admin)

const allUsers = async (req, res, next) => {

  try {
    const users = await User.find();
    users && res.status(200).json({ message: "All Users", users });
  }

  catch (err) {
    console.log("Finding Users Error", err);
    next(err)
  }

}




//get All Employess (only access by admin)

const teamMembers = async (req, res, next) => {

  try {
    const supervisor = await User.find({_id: req.params.id})


    const users = await User.find({_id: { $in: supervisor[0].teamMembers } });

    console.log("supervisorTeam", users)

    users && res.status(200).json({ message: "All Users", users });
  }

  catch (err) {
    console.log("Finding Users Error", err);
    next(err)
  }

}




//add team member to supervisor
const addTeamMember = async (req, res, next) => {



  try {
   
    // const supervisor = await User.find({ _id: req.params.id });

    // console.log("addTeamMember",supervisor)


    // if (!find) {
    //   next(createError(404, "User not found"))
    // }


    const updatedSupervisor = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { teamMembers: req.body.id } }
    
    );


    res.status(200).json(updatedSupervisor);

  } catch (err) {
    console.log("update user error", err)
    next(err);
  }
}




module.exports = {
  addTeamMember,
  teamMembers,
  allUsers,
  singleUser,
  updateUser,
  deleteUser
}