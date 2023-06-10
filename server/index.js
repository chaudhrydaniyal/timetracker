const express = require("express");
const app = express()
const env = require("dotenv")
const path = require('path')
const connectDB = require("./Connection/connection")
const multer = require ("multer")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const authRoute = require('./Routes/auth')
const usersRoute = require('./Routes/users')
const cookieparser = require("cookie-parser");
const projectRoute = require('./Routes/projects')
const projectPhaseRoute = require('./Routes/ProjectPhases')
const companiesroute = require('./Routes/Companies/Companies')
const departmentsRoute = require('./Routes/departments')
const emailRoute = require('./Routes/email')


const taskRoute = require('./Routes/tasks')
const assignedTasksRoute = require('./Routes/assignedTasks')

const nodeCron = require("node-cron");

const assignedTasks = require('./Models/assignedTasks')


const cors = require("cors")
env.config()


app.use(cors());
app.use(cookieparser());
// app.use(multer().none());

app.use(express.json());


//DB connection
connectDB();
//user image upload directory 


// app.use("/images", express.static(path.join(__dirname )));



app.use("/images", express.static(path.join(__dirname, "/images")));



//xlxs
//Routes 
app.use(bodyparser.urlencoded({extended:true}));
//multer image upload



// app.post("/upload", upload.single("logo"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });
//Routes
// app.use(require("./Routes/holiday"));
app.use('/projectphase',projectPhaseRoute)
app.use('/assigntask',assignedTasksRoute)
app.use('/auth',authRoute)
app.use('/projects',projectRoute)
app.use('/users',usersRoute)
app.use('/tasks',taskRoute)
app.use('/companies',companiesroute);
app.use('/departments',departmentsRoute);
app.use('/email/',emailRoute);


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
const PORT = 7000;




const job = nodeCron.schedule("1 * * * * *", async function jobYouNeedToExecute() {
  // Do whatever you want in here. Send email, Make  database backup or download data.
  // console.log("I am called");
  try {
    const updateTask = await assignedTasks.findOneAndUpdate({ status: "Completed" }, {
        // date: req.body.date,
        // title: req.body.title,
        // description: req.body.description,
        // selectProject: req.body.selectProject,
        // startTime: req.body.startTime,
        // endTime: req.body.endTime,
        // addedby: req.body.addedby,
        // projectPhase: req.body.projectPhase
        status: "Pending"
    })
    //   await addtask.save()
    // updateTask && res.status(200).json({ message: "Sucessfully Added task", updateTask })
}
catch (error) {
    console.log("error adding task", error);
    // next(error)
}
});



app.listen(PORT,()=>{
  console.log(`app is listen at ${PORT}`)
})