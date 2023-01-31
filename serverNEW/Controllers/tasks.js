const Tasks = require('./../Models/dailytasks')
const createError = require('./../Utils/Error/error')

//only admin can add
const AddTask = async (req, res, next) => {

    try {
        const addtask = new Tasks({
            date: req.body.date,
            title: req.body.title,
            description: req.body.description,
            selectProject: req.body.selectProject,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            addedby: req.body.addedby,
            projectPhase: req.body.projectPhase,
            status: req.body.status

        })
        await addtask.save()
        addtask && res.status(200).json({ message: "Sucessfully Added task", addtask })
    }
    catch (error) {
        console.log("error adding task", error);
        next(error)
    }
}



const UpdateTask = async (req, res, next) => {
    try {
        const updateTask = await Tasks.findOneAndUpdate({ _id: req.body._id }, {
            date: req.body.date,
            title: req.body.title,
            description: req.body.description,
            selectProject: req.body.selectProject,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            addedby: req.body.addedby,
            projectPhase: req.body.projectPhase,
            status:req.body.status,
            remarks:req.body.remarks
        })
        //   await addtask.save()
        updateTask && res.status(200).json({ message: "Sucessfully Added task", updateTask })
    }
    catch (error) {
        console.log("error adding task", error);
        next(error)
    }
}

const DeleteTask = async (req, res, next) => {
    try {

        const deleteTask = await Tasks.deleteOne({ _id: req.params.id });

        deleteTask && res.status(200).json({ message: "Sucessfully Added task", deleteTask })
    }
    catch (error) {
        console.log("error adding task", error);
        next(error)
    }
}



// //only admin can access

// const getAll = async (req, res, next) => {
//     try {
//         const get = await Tasks.find({})
//             .populate('selectProject')
//             .populate('addedby')
//         get && res.status(200).json({ message: "All Task", get })
//     } catch (error) {
//         next(error)
//     }
// }





//only admin can access

const getAll = async (req, res, next) => {
    try {
        var get = await Tasks.find({})
            .populate('selectProject')
            .populate('addedby')

        get = get.filter(f=>f.selectProject.supervisor==req.params.id || f.selectProject.assignTo.includes(req.params.id))    


        get && res.status(200).json({ message: "All Task", get })
    } catch (error) {
        next(error)
    }
}





//get specific users with their tasks

const singleUser = async (req, res, next) => {
    try {
        const task = await Tasks.find({ addedby: req.params.id }).sort({ _id: -1 })
        if (!task) {
            next(createError(404, "Task not found"))
        }
        //  await Tasks.find({addedby:req.params.id})
        res.status(200)
            .json({ message: "Success", task })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    AddTask,
    singleUser,
    UpdateTask,
    DeleteTask
}