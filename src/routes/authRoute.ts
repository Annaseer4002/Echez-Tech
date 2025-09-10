import {Router} from "express";
const router = Router();
import { handleLogin, handleSignUp } from "../controllers/authController.js";






router.post('/signUp', handleSignUp)
router.post('/login', handleLogin)


export default router;