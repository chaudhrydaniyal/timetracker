const express = require('express');
const User = require('../../Models/users')
const createError = require('../../Utils/Error/error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AddUser = async(req,res,next) =>{
 
    try{
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashpassword,
            phone: req.body.phone,
            address: req.body.address,
            department: req.body.department,
            role: req.body.role,
            joiningdate: req.body.joiningdate,
            profilepic: req.body.profilepic,
            projects:req.body.projects,
            isAdmin:req.body.isAdmin
        })
        await newUser.save();
       newUser && res.status(200).json({message:"Succesfully create",newUser})

    }catch(error){
        console.log("Create User Error",error);
        next(error)
        
    }
}

//login user with jwt

const login = async(req,res,next) =>{
    try {
        const user = await User.findOne({
          username: req.body.username,
        });
        console.log(user, "user");
        //custom error
        if (!user) return next(createError(404, "User not found!"));
    
        //password comparret
        const comparePassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!comparePassword) return next(createError(400, "Wrong password or username!"));
        
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.jwtkey
        );
        const { password, isAdmin, ...otherdetails } = user._doc;
        res
          .cookie("access_token", token)
          .status(200)
          .json({ details: { ...otherdetails }, isAdmin });
      } catch (error) {
        next(error);
      }
    
}



module.exports  = {
    AddUser,
    login,
}