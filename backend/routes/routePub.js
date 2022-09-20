const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config.js");

const router = express.Router();

const publicationsControllers = require("../controllers/controllersPub");

router.post("/", auth, multer, publicationsControllers.createPublication);
router.put("/:id", auth, multer, publicationsControllers.modifyPublication);
router.delete("/:id", auth, publicationsControllers.deletePublication);
router.get("/:id", auth, publicationsControllers.getOnePublication);
router.get("/", auth, publicationsControllers.getAllPublications);
router.post("/:id/like", auth, publicationsControllers.likePublication);

// bac à sable
// router.get("/devtoutemespub", publicationsControllers.getAllPublicationsdev);

module.exports = router;
