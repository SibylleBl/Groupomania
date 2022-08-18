const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/controllersUser.js");

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);
router.get("/:id", userControllers.getOneUser);

module.exports = router;
