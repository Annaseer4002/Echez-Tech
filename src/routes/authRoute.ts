import {Router} from "express";
const router = Router();
import { handleFindAllUsers, handleLogin, handleSignUp } from "../controllers/authController.js";
import { Authorization } from "../middlewares/authMiddleware.js";






router.post('/signUp', handleSignUp)
router.post('/login', handleLogin)
router.get('/findAllUsers', Authorization, handleFindAllUsers)


export default router;