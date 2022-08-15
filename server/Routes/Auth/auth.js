const express = require("express");
const router = express.Router();
const {AddUser,login} = require('../../Controllers/Auth/Auth')
router.post('/register',AddUser);
router.post('/login',login);

module.exports = router;