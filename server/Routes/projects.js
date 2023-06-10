const express = require('express');
const router = express.Router();
const {AddProject,getAll,updateProject,single, EditProject, DeleteProject, userProjects, totalTasksCount,  tasksCount, tasksCountOverall} = require('../Controllers/projects');
const { checkForAdmin } = require('../Permissions/checkForAdmin');

router.post('/addproject',AddProject);
router.put('/addproject',EditProject)
router.get('/allprojects/:id',getAll)
router.get('/userprojects/:id',userProjects);
router.put('/assignproject/:id',updateProject)
router.get('/:id',single)
router.delete('/:id',DeleteProject)

// Project dashboard apis

router.get('/stats/totaltaskscount/:id',totalTasksCount)
router.get('/stats/taskscount/:id',tasksCount)
router.get('/stats/taskscountoverall/',tasksCountOverall)



module.exports =router