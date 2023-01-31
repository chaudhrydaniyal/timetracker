const express = require('express');
const User = require('../Models/users')
const createError = require('../Utils/Error/error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AddUser = async(req,res,next) =>{
 
    try{
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            firstname: req.body.firstname,
            fullname: req.body.fullname,
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


        console.log('accesstoken ', process.env.ACCESS_TOKEN_SECRETKEY)

        console.log(user, "user");
        //custom error
        if (!user) return next(createError(404, "User not found!"));
    
        //password comparret
        const comparePassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!comparePassword) return next(createError(400, "Wrong password or username!"));
        


        const { password, isAdmin, ...otherdetails } = user._doc;
     

          const token = jwt.sign(
            { details: { ...otherdetails }, isAdmin },
            process.env.ACCESS_TOKEN_SECRETKEY
          );



          res
          .cookie("access_token", token)
          .status(200)
          .json({ details: { ...otherdetails }, isAdmin ,token});


      } catch (error) {
        next(error);
      }
    
}


//update a user
const updateUser = async (req, res, next) => {

  const salt = bcrypt.genSaltSync(10);
  const hashpassword = bcrypt.hashSync(req.body.password, salt);


  try {
    // const find = await User.findById(req.body.id);

    // console.log("find", find)
    // if (!find) {
    //   next(createError(404, "User not found"))
    // }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: {username:req.body.username,
      password:hashpassword,
      fullname:req.body.fullname,
      role:req.body.role,
      activeUser: req.body.activeUser

      } },
      // { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("update user error", err)
    next(err);
  }
}




module.exports  = {
    AddUser,
    login,
    updateUser
}