const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config.js");
const userControllers = require("../controllers/controllersUser.js");

router.post("/signup", multer, userControllers.signup);
router.post("/login", userControllers.login);
router.put("/modifyUser", multer, userControllers.modifyUser);
router.get("/me", auth, userControllers.getMe);
router.get("/:id", userControllers.getOneUser);
router.get("/", userControllers.getAllUsers);

module.exports = router;
