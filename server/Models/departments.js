const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const DepartmentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },


  description: {
    type: String,
    required: true,
  },

  company: {
    type: ObjectId,
    required: true,
  },



});

const Departments = mongoose.model('Departments',DepartmentsSchema);
module.exports=Departments;
