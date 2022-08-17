const express = require("express")
const router = express.Router();
const {AddTask,getAll} = require('../../../Controllers/Admin/tasks/tasks')

router.post('/addtask',AddTask)
router.get('/alltasks',getAll)
module.exports = router;