"use strict";

const express = require("express");
const app = express();
const env = require("dotenv");
const path = require('path');
const connectDB = require("./Connection/connection");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const authRoute = require('./Routes/Auth/auth');
const usersRoute = require('./Routes/users');
const cookieparser = require("cookie-parser");
const projectRoute = require('./Routes/Admin/Project/Project');
const projectPhaseRoute = require('./Routes/Admin/Project/ProjectPhases');
const taskRoute = require('./Routes/Admin/tasks/tasks');
const assignedTasksRoute = require('./Routes/Admin/tasks/assignedTasks');
const cors = require("cors");
env.config();
app.use(cors());
app.use(cookieparser());
app.use(express.json());

//DB connection
connectDB();
//user image upload directory 
app.use("/images", express.static(path.join(__dirname, "/images")));
//xlxs
//Routes 
app.use(bodyparser.urlencoded({
  extended: true
}));
//multer image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
});

const upload = multer({
  storage: storage
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
//Routes
// app.use(require("./Routes/holiday"));
app.use('/projectphase', projectPhaseRoute);
app.use('/assigntask', assignedTasksRoute);
app.use('/auth', authRoute);
app.use('/projects', projectRoute);
app.use('/users', usersRoute);
app.use('/tasks', taskRoute);
app.use((err, req, res, next) => {
  console.log("i am middleware", req.body);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  });
});
//Port settings
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`app is listen at ${PORT}`);
});