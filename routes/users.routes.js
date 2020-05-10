/** @format */

const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const validate = require("../validations/user.validate");
const middleware = require("../middleware/pagination.middleware");
const db = require("../db");

const users = db.get("users").value();

/* GET users listing. */
router.get("/", middleware.paginetedResut(users), controller.index);

router.get("/search", controller.search);

router.get("/create", controller.create);

router.post("/create", validate.postCreate, controller.postCreate);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/update", controller.postUpdate);

module.exports = router;
