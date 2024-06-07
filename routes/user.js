const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/users");
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

module.exports = router;
