const express = require("express")
const router = express.Router();
const {AssignTask,getAll,singleUser, UpdateAssignedTask, DeleteTask} = require('./../Controllers/assignedTasks')

router.post('/task',AssignTask)
router.get('/alltasks',getAll)
router.get('/:id',singleUser)


router.put('/task',UpdateAssignedTask)
router.delete('/:id',DeleteTask)

module.exports = router;