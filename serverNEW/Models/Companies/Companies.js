const mongoose = require("mongoose");

const CompaniesSchema = new mongoose.Schema({

  companyName: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "N/A",
  },
  phoneNo: {
    type: Number,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "N/A",
  },
  postalCode: {
    type: String,
    default: "",
  },
  departments:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'Departments'
  },
  employees:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'user'
  },
  logo:{
    type:String
  },
  projects:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:''
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }
  
});

const Companies = mongoose.model('Companies',CompaniesSchema);
module.exports=Companies;
