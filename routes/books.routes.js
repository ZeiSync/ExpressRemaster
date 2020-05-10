/** @format */

const express = require("express");
const controller = require("../controllers/books.controller");
const middleware = require("../middleware/upload.middleware");
const validate = require("../validations/book.validate");

const router = express.Router();

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.create);

router.post("/create", validate.postCreate, controller.postCreate);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/update", controller.postUpdate);

module.exports = router;
