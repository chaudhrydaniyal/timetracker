const express = require('express');
const router = express.Router();
const {AddProject,getAll} = require('../../../Controllers/Admin/CreateProject/create')
const {verifyAdmin} = require('../../../Utils/VerifyAdmin/Verify')


router.post('/addproject',AddProject);


router.get('/allprojects',getAll)
module.exports = router;