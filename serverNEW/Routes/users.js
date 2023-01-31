const express = require("express")
require("../Connection/connection");
const bcrypt = require("bcrypt")
const router = express.Router();
const {allUsers,teamMembers, deleteUser,singleUser,updateUser, addTeamMember} = require('../Controllers/users')
const {verifyAdmin,verifyUser} = require('../Utils/VerifyAdmin/Verify')


//for getting All employee 


router.get("/allusers" ,allUsers)

router.put("/addTeamMembers/:id" ,addTeamMember)


router.put("/:id",updateUser)

router.get("/teamMembers/:id" ,teamMembers)




//for deleting an employeee

router.delete('/:id',verifyUser, deleteUser)

//for getting specific employee

router.get("/:id",verifyUser,singleUser)

///updating Employee DATA 



module.exports = router;