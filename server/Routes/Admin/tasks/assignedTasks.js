const express = require("express")
const router = express.Router();
const {AssignTask,getAll,singleUser, UpdateTask, DeleteTask} = require('../../../Controllers/Admin/tasks/assignedTasks')

router.post('/task',AssignTask)
router.get('/alltasks',getAll)
router.get('/:id',singleUser)


router.put('/addtask',UpdateTask)
router.delete('/:id',DeleteTask)

module.exports = router;