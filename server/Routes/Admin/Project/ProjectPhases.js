const express = require('express');
const router = express.Router();
const {AddPhase ,getPhases, updateProject,single, EditProject, DeleteProject} = require('../../../Controllers/Admin/CreateProject/ProjectPhases')

router.post('/addprojectphase',AddPhase);
router.get('/getprojectphases/:id',getPhases)


router.put('/addproject',EditProject)

router.put('/assignproject/:id',updateProject)
router.get('/:id',single)
router.delete('/:id',DeleteProject)

module.exports =router