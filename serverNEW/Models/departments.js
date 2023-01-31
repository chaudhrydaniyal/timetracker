
const mongoose = require("mongoose");

const departments = mongoose.model(
  "departments",
  new mongoose.Schema({
    name: String,
    
   })
);

module.exports = departments;
