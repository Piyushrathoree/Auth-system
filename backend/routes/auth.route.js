import { Router } from "express";
import {
    registerUser,
    loginUser,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
} from "../controllers/auth.controller.js";
import verifyToken from "../middleware/verifyToken.middleware.js";

const router = Router();

router.get("/check-auth", verifyToken, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
        message: "your are authenticated properly",
    });
});
// ✅ Normal Authentication Routes
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
