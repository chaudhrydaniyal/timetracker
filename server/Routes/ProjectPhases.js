const express = require('express');
const router = express.Router();
const {AddPhase ,getPhases, updateProject,single, EditProject, DeletePhase} = require('../Controllers/ProjectPhases')

router.post('/addprojectphase',AddPhase);
router.get('/getprojectphases/:id',getPhases)
router.delete('/:id',DeletePhase)
router.put('/addproject',EditProject)
router.put('/assignproject/:id',updateProject)
router.get('/:id',single)

module.exports =router