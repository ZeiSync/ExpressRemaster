/** @format */

const express = require("express");

const router = express.Router();

const controller = require("../controllers/auth.controllers");

router.post("/login", controller.PostLogin);

module.exports = router;
