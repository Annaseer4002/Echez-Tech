import {Router} from "express";
const router = Router();
import { handleFindAllUsers, handleLogin, handleSignUp } from "../controllers/authController.js";
import { Authorization, isAdmin } from "../middlewares/authMiddleware.js";






router.post('/signUp', handleSignUp)
router.post('/login', handleLogin)
router.get('/findAllUsers', isAdmin, handleFindAllUsers)


export default router;