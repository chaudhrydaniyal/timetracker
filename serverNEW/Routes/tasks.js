const express = require("express")
const router = express.Router();
const {AddTask,getAll,singleUser, UpdateTask, DeleteTask} = require('./../Controllers/tasks')



router.post('/addtask',AddTask)
router.put('/addtask',UpdateTask)
router.get('/alltasks/:id',getAll)
router.get('/:id',singleUser)
router.delete('/:id',DeleteTask)



module.exports = router;