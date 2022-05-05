const express = require("express");
const userRoutes = express.Router();

const { userController } = require("../controller");

userRoutes.post("/register", userController.userRegister);
userRoutes.post("/login", userController.userLogin);

module.exports = { userRoutes };
