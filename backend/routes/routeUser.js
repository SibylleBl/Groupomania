const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const userControllers = require("../controllers/controllersUser.js");

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);
router.get("/me", auth, userControllers.getMe);
router.get("/:id", userControllers.getOneUser);
router.get("/", userControllers.getAllUsers);

module.exports = router;
