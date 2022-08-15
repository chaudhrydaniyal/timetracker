const express = require("express");
const app = express()
const env = require("dotenv")
const path = require('path')
const connectDB = require("./Connection/connection")
const multer = require ("multer")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const employeeRoute = require("./Routes/employees")
const CalendarRoute = require("./Routes/calendar")
const holidayRoute = require("./Routes/holiday")
const ecxel = require("./convertecxel")
const cors = require("cors")
const importecxel = require("./Routes/import")
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
app.use('/employee',employeeRoute);
app.use("/calendar",CalendarRoute);
app.use("/calendar/holiday",holidayRoute);
app.use("/",importecxel)
app.use("/",ecxel);
//Port settings
const PORT = 5000;

console.log('hello world')
app.listen(PORT,()=>{
  console.log(`app is listen at ${PORT}`)
})