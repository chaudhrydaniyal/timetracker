const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const EmployeesSchema = new mongoose.Schema({
       
     emp_id:Number,
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
    
     designation:{
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
     }
    
},{ timestamps: true },);
EmployeesSchema.plugin(AutoIncrement, {inc_field: 'emp_id'});
const Employees = mongoose.model("Employees",EmployeesSchema)
module.exports = Employees;
