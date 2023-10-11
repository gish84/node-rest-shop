const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");
const checkAuth = require("../middleware/check-auth");

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.delete("/:userId", checkAuth, UserController.delete);

module.exports = router;
