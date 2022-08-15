const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
   
     firstname:{
        type:String,
        require:true
     },
     lastname:{
        type:String,
        require:true
     },
     username:{
      type:String,
      unique:true,
      require:true
     },
     email:{
      type:String,
      require:true,
      trim: true,
      lowercase: true
      },
     
     password:{
      type:String,
      require:true
     },

     phone:{
        type:Number,
        require:true
     },
     address:{
        type:String,
        require:true
     },
    
     role:{
        type:String,
        required:true
     },
     department:{
       type:String,
       required:true
     },
     joiningdate:{
      type:String,
      require:true

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
const Users = mongoose.model("Users",userSchema)
module.exports = Users;
