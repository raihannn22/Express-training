var express = require("express");
var router = express.Router();

const user = require("../controllers/user");
const { body } = require('express-validator');

router.get('/get-list' ,user.getAllUsers)

router.get('/by-id/:id' ,user.getUserById)

router.get('/coba' ,user.coba)

router.post('/save', [
    body('email').notEmpty().withMessage('Email tidak boleh kosong'),
    body('name').notEmpty().withMessage('Name tidak boleh kosong')
] ,user.saveUser)

module.exports = router;
