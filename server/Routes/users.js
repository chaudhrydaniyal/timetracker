const express = require("express")
require("../Connection/connection");
const bcrypt = require("bcrypt")
const router = express.Router();
const {allUsers,deleteUser,singleUser,updateUser} = require('../Controllers/users')
const {verifyAdmin,verifyUser} = require('../Utils/VerifyAdmin/Verify')


//for getting All employee 


router.get("/allusers" ,allUsers)
//for deleting an employeee

router.delete('/:id',verifyUser, deleteUser)

//for getting specific employee

router.get("/:id",verifyUser,singleUser)

///updating Employee DATA 

router.put("/:id", verifyUser,updateUser)



module.exports = router;