import { Router } from "express";
import {
    registerUser,
    loginUser,
    logout,
    verifyEmail,
} from "../controllers/auth.controller.js";

const router = Router();

// ✅ Normal Authentication Routes
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

router.post('/verify-email', verifyEmail)
export default router;
