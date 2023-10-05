const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

// registrace nového uživatele (vložení nového uživatele do dtb)
router.post("/signup", UserController.user_signup);

// přihlášení existujícího uživatele
router.post("/login", UserController.user_login);

// smazání uživatele
router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;
