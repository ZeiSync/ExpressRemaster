/** @format */

const express = require("express");

const router = express.Router();

const controller = require("../controllers/transaction.controllers");

router.get("/transaction", controller.index);

module.exports = router;
