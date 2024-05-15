import express from "express";
import { createUser, loginUser } from "../controller/userController.js";

const router = express.Router();

// Route to create a new User
router.post("/create", createUser);

// Route to log In
router.post("/login", loginUser);

export default router;
