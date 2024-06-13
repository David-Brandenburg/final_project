import express from "express";
import { checkAdmin } from '../controller/apiController.js'

const router = express.Router();

router.get("/checkAdmin/:accountId", checkAdmin);

export default router;