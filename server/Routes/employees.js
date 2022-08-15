const express = require("express")
require("../Connection/connection");
const bcrypt = require("bcrypt")
const router = express.Router();
const {AddUser} = require('../Controllers/Auth/Auth')
const {verifyAdmin,verifyToken,verifyUser} = require('../Utils/VerifyAdmin/Verify')


//for getting All employee 


router.get("/", async (req, res) => {


   
})
//for deleting an employeee

router.delete('/:id', async (req, res) => {
   
})

//for getting specific employee

router.get("/:id", async (req, res) => {
   
})

///updating Employee DATA 

router.put("/:id", async (req, res) => {
    
})



module.exports = router;