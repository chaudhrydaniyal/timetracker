const express = require("express")
const router = express.Router();
const {AddTask,getAll,singleUser} = require('../../../Controllers/Admin/tasks/tasks')

router.post('/addtask',AddTask)
router.get('/alltasks',getAll)
router.get('/:id',singleUser)
module.exports = router;