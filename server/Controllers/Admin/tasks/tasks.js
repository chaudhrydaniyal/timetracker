const Tasks = require('../../../Models/Admin/tasks/dailytasks')

//only admin can add
const AddTask  = async(req,res,next) =>{

    try{
          const addtask = new Tasks({
            date:req.body.date,
            title:req.body.title,
            description:req.body.description,
            selectProject:req.body.selectProject
          })
          await addtask.save()
         addtask && res.status(200).json({message:"Sucessfully Added task",addtask}) 
    }
    catch(error){
       console.log("error adding task",error);
       next(error)
    }
}

//only admin can access

const getAll  = async(req,res,next)=>{
    try{
        const get  = await Tasks.find({}).populate('selectProject')
        get && res.status(200).json({message:"All Task",get})
        }catch(error){
           next(error)
    }
}


module.exports ={
    getAll,
   AddTask
}