import express from "express";
import { createUser, loginUser, getUsers, getUser, updateAccountProfilePic, updateAccountPassword, updateAccountInfo } from "../controller/userController.js";
import checkToken from "./../middleware/checkToken.js";
import upload from '../middleware/cloudinary.js';

const router = express.Router();

// Route to create a new User
router.post("/create", createUser);

router.get("/", getUsers);

router.get("/:accountId", getUser);

// Route to log In
router.post("/login", loginUser);

// Route to log out
// router.post("/logout", logoutUser);

// Route to check token
router.post("/checktoken", checkToken);

router.patch("/updateAccountProfilePic/:accountId", upload.single("profilepic"), updateAccountProfilePic)

router.patch("/updateAccountPassword/:accountId", updateAccountPassword);

router.patch("/updateAccountInfo/:accountId", updateAccountInfo);

export default router;
