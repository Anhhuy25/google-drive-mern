const express = require("express");
const router = express.Router();

const verifyToken = require("../app/middlewares/auth");
const authController = require("../app/controllers/AuthController");

router.delete("/users/:id", authController.deleteUser);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/idusers", authController.postID);
router.get("/users", authController.getAllUsers);
router.get("/", verifyToken, authController.checkUserLogin);

module.exports = router;
