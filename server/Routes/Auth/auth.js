const express = require("express");
const router = express.Router();
const {AddUser,login, updateUser} = require('../../Controllers/Auth/Auth')
router.post('/register',AddUser);
router.post('/login',login);
router.put('/register/:id',updateUser);


module.exports = router;