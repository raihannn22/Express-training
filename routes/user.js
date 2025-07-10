var express = require("express");
var router = express.Router();

const user = require("../controllers/user");

router.get('/get-list' ,user.getAllUsers)

router.get('/by-id/:id' ,user.getUserById)

module.exports = router;
