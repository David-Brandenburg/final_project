import express from "express";
import { createUser, loginUser } from "../controller/userController.js";
import checkToken from "./../middleware/checkToken.js";

const router = express.Router();

// Route to create a new User
router.post("/create", createUser);

// Route to log In
router.post("/login", loginUser);

// Route to log out
// router.post("/logout", logoutUser);

// Route to check token
router.post("/checktoken", checkToken);

export default router;
