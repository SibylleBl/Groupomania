const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/controllersUser.js");

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);
router.get("/:id", userControllers.getOneUser);
router.get("/", userControllers.getAllUsers);

module.exports = router;
