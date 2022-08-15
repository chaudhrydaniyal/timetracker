const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const userSchema = new mongoose.Schema({
       
     emp_id:Number,
     firstname:{
        type:String,
     },
     lastname:{
        type:String,
     },
     username:{
      type:String,
      unique:true,
     },
     email:{
      type:String,
      trim: true,
      lowercase: true
      },
     
     password:{
      type:String,
     },

     phone:{
        type:Number,
     },
     address:{
        type:String,
     },
    
     role:{
        type:String,
     },
     department:{
       type:String,
     },
     joiningdate:{
      type:String,

     },
     profilepic:{
      type:String,
      default:""
     },
     isAdmin:{
      type:Boolean,
      default:false
     }
    
},{ timestamps: true },);
userSchema.plugin(AutoIncrement, {inc_field: 'emp_id'});
const Users = mongoose.model("Users",userSchema)
module.exports = Users;
