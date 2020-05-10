/** @format */

const express = require("express");

const router = express.Router();

const controller = require("../controllers/cart.controller");

router.get("/:id/add", controller.addToCart);

module.exports = router;
