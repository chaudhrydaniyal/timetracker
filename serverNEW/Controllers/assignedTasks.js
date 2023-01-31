const assignedTasks = require('./../Models/assignedTasks')
const createError = require('./../Utils/Error/error')

//only admin can add
const AssignTask = async (req, res, next) => {

    try {
        const assignTask = new assignedTasks({
            date: req.body.date,
            title: req.body.title,
            description: req.body.description,
            project: req.body.project,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            addedby: req.body.addedby,
            phase: req.body.phase,
            assignedTo: req.body.assignedTo,
            status: req.body.status
        })
        await assignTask.save()
        assignTask && res.status(200).json({ message: "Sucessfully Added task", assignTask })
    }
    catch (error) {
        console.log("error adding task", error);
        next(error)
    }
}


//only admin can access

const getAll = async (req, res, next) => {
    try {
        const get = await assignedTasks.find({})
            .populate('assignedTo')
            .populate('project')
        get && res.status(200).json({ message: "All Task", get })
    } catch (error) {
        next(error)
    }
}




//get specific users with their tasks

const singleUser = async (req, res, next) => {
    try {
        const task = await assignedTasks.find({ assignedTo: req.params.id }).populate('project')
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






const UpdateAssignedTask = async (req, res, next) => {
    try {
        const updateTask = await assignedTasks.findOneAndUpdate({ _id: req.body._id }, {
            // date: req.body.date,
            // title: req.body.title,
            // description: req.body.description,
            // selectProject: req.body.selectProject,
            // startTime: req.body.startTime,
            // endTime: req.body.endTime,
            // addedby: req.body.addedby,
            // projectPhase: req.body.projectPhase
            status: req.body.status
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





module.exports = {
    getAll,
    AssignTask,
    singleUser,
    UpdateAssignedTask,
    DeleteTask
}