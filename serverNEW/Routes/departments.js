const express = require("express")
const router = express.Router();
const {addDepartment } = require('../../../Controllers/Admin/tasks/assignedTasks')

router.post('/department',addDepartment)


module.exports = router;