const express = require("express");
const router = express.Router();
const {getCompany,addcompany} = require('../../Controllers/Companies/companies')
router.get('/',getCompany);
router.post('/addcompany',addcompany)

module.exports = router