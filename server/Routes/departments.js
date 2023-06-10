

const express = require("express");
const { addDepartment, getDepartments, deleteDepartment, getCompanyDepartments } = require("./../Controllers/departments");
const router = express.Router();
// const {getDepartments,addDepartment} = require('../../Controllers/departments')

router.get('/',getDepartments);
router.get('/:id',getCompanyDepartments);
router.post('/',addDepartment);
router.delete('/:id',deleteDepartment);


module.exports = router