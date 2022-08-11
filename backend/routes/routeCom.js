const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const commentairesControllers = require("../controllers/controllersCom");

router.post("/", auth, commentairesControllers.createComment);

module.exports = router;
