const express = require('express');
const router = express.Router();
const {AddProject,getAll,updateProject,single} = require('../../../Controllers/Admin/CreateProject/create')

router.post('/addprojects',AddProject);
router.get('/allprojects',getAll)
router.put('/assignproject/:id',updateProject)
router.get('/:id',single)
module.exports =router