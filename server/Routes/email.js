const express = require('express');
const router = express.Router();
const {sendTimesheet} = require('../Controllers/email');

router.post('/sendmail',sendTimesheet);



module.exports =router