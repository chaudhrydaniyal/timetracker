const express = require('express');
const User = require('../Models/users')
const createError = require('../Utils/Error/error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Company = require("../Models/Companies/Companies")
const AddUser = async (req, res, next) => {

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      firstname: req.body.firstname,
      fullname: req.body.fullname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      companies: req.body.companies,
      password: hashpassword,
      phone: req.body.phone,
      address: req.body.address,
      departments: req.body.departments,
      role: req.body.role,
      designation: req.body.designation,
      joiningdate: req.body.joiningdate,
      profilepic: req.body.profilepic,
      projects: req.body.projects,
      isAdmin: req.body.isAdmin
    })
   await newUser.save();

   
  console.log("new user",newUser)
    res.status(200).json({ message: "Succesfully create", newUser})

  } catch (error) {
    console.log("Create User Error", error);
    next(error)

  }
}

//login user with jwt

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    }).populate("companies", { "companyName": 1 });



    //custom error
    if (!user) return next(createError(404, "User not found!"));

    //password comparret
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) return next(createError(400, "Wrong password or username!"));


    console.log("userdoc", user._doc)

    const { password, isAdmin, ...otherdetails } = user._doc;

    const token = jwt.sign(
      { details: { ...otherdetails }, isAdmin },
      process.env.ACCESS_TOKEN_SECRETKEY
    );


    res
      .cookie("access_token", token)
      .status(200)
      .json({ details: { ...otherdetails }, isAdmin, token });


  } catch (error) {
    next(error);
  }

}


//update a user
const updateUser = async (req, _res, _next) => {

  const salt = bcrypt.genSaltSync(10);
  const hashpassword = bcrypt.hashSync(req.body.password, salt);

   
  try {
    const find = await User.findById(req.body.id);

    console.log("find", find)
    if (!find) {
      next(createError(404, "User not found"))
    }

    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: hashpassword,
          fullname: req.body.fullname,
          role: req.body.role,
          companies:req.body.companies,
          departments: req.body.departments,
          activeUser: req.body.activeUser

        },
        
        
        
      },
 
    //update company
   
     
      // { new: true }
    );
   
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("update user error", err)
    next(err);
  }
}






module.exports = {
  AddUser,
  login,
  updateUser,

}