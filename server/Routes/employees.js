const express = require("express")
const Employee = require("../Models/employees")
require("../Connection/connection");
const bcrypt = require("bcrypt")
const router = express.Router();

//Add employee
router.post('/addemployee', async (req, res) => {
    console.log("req body",req.body)
    const employees = new Employee(req.body)
    try {

        // for password encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newemployee = await employees.save();
        console.log(newemployee);
        res.status(202).json(newemployee)

        const employee = new Employee({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            phone: req.body.phone,
            address: req.body.address,
            designation: req.body.designation,
            department: req.body.department,
            joiningdate: req.body.joiningdate,
            profilepic: req.body.profilepic

        });
        console.log(req.body, "req body")
        const user = await employee.save();  
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }

})
//for getting All employee 


router.get("/", async (req, res) => {


    try {

        const abc = await Employee.find();
        res.status(200).json(abc);

    } catch (err) {

        res.status(500).json(err)

    }
})
//for deleting an employeee

router.delete('/:id', async (req, res) => {
    // if (req.body.empId === req.params.id)

        // try {
            const employee = await Employee.findById(req.params.id);
            try {
                await Employee.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted...");

            } catch (error) {
                console.log(error)
                res.status(500).json(err);
            }


        // } catch (error) {
        //     res.status(404).json("User not found!");

        // }
    // else {
    //     res.status(401).json("You can delete only your account!");
    // }
})

//for getting specific employee

router.get("/:id", async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        const { password, ...others } = employee._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

///updating Employee DATA 

router.put("/:id", async (req, res) => {
    try {
        const employee = await Employee.findById(req.body.id)
        try {
            const updateData = await Employee.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updateData);
        } catch (error) {
            res.status(500).json(error)
        }

    } catch (error) {
        res.status(500).json(error)

    }




})



module.exports = router;