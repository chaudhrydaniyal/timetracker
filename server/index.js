const express = require("express");
const app = express()
const env = require("dotenv")
const path = require('path')
const connectDB = require("./Connection/connection")
const multer = require ("multer")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const authRoute = require('./Routes/Auth/auth')
const cors = require("cors")
env.config()
app.use(express.json());
app.use(cors());

//DB connection
connectDB();
//user image upload directory 
app.use("/images", express.static(path.join(__dirname, "/images")));
//xlxs
//Routes 
app.use(bodyparser.urlencoded({extended:true}));
//multer image upload
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
})
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
//Routes
// app.use(require("./Routes/holiday"));
app.use('/auth',authRoute)

app.use((err,req,res,next)=>{
  console.log("i am middleware", req.body);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
})
//Port settings
const PORT = 5000;

app.listen(PORT,()=>{
  console.log(`app is listen at ${PORT}`)
})