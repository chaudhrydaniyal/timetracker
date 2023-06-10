const express = require("express");
const router = express.Router();
const {getCompany,addcompany, updatecompany} = require('../../Controllers/Companies/companies')


router.get('/',getCompany)
router.post('/addcompany',addcompany)
router.put('/',updatecompany)


module.exports = router