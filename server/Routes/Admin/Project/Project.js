const express = require('express');
const router = express.Router();
const {AddProject,getAll,updateProject,single, EditProject, DeleteProject, userProjects} = require('../../../Controllers/Admin/CreateProject/create')

router.post('/addproject',AddProject);
router.put('/addproject',EditProject)

router.get('/allprojects/:id',getAll)
router.get('/userprojects/:id',userProjects);


router.put('/assignproject/:id',updateProject)
router.get('/:id',single)
router.delete('/:id',DeleteProject)

module.exports =router