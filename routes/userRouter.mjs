import express from "express";
import { login, register } from "../controllers/authController.mjs";

let router = express.Router();


router.post('/create',register)
router.post('/login',login)
export default router