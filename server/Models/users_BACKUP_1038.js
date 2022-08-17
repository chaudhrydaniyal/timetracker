const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
   
     firstname:{
        type:String,
<<<<<<< HEAD
     },
     lastname:{
        type:String,
=======
      
     },
     lastname:{
        type:String,
       
>>>>>>> 9ae992b72e1c281810a2b8fb61d8464e11d21700
     },
     username:{
      type:String,
      unique:true,
<<<<<<< HEAD
     },
     email:{
      type:String,
=======
      
     },
     email:{
      type:String,

>>>>>>> 9ae992b72e1c281810a2b8fb61d8464e11d21700
      trim: true,
      lowercase: true
      },
     
     password:{
      type:String,
<<<<<<< HEAD
=======
      
>>>>>>> 9ae992b72e1c281810a2b8fb61d8464e11d21700
     },

     phone:{
        type:Number,
<<<<<<< HEAD
     },
     address:{
        type:String,
=======
      
     },
     address:{
        type:String,
       
>>>>>>> 9ae992b72e1c281810a2b8fb61d8464e11d21700
     },
    
     role:{
        type:String,
<<<<<<< HEAD
     },
     department:{
       type:String,
     },
     joiningdate:{
      type:String,
=======
    
     },
     department:{
       type:String,
      
     },
     joiningdate:{
      type:String,
 
>>>>>>> 9ae992b72e1c281810a2b8fb61d8464e11d21700

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
