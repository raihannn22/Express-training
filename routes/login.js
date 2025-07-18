var express = require("express");
var router = express.Router();

const auth = require("../middlewares/auth");
const { body } = require('express-validator');

router.post('/login', [
    body('email').notEmpty().withMessage('Email tidak boleh kosong'),
    body('password').notEmpty().withMessage('Password tidak boleh kosong')
] ,auth.login)

module.exports = router;