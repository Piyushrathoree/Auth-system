import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../utils/generateToken.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mail/emails.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send("Please fill all the fields");
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already exists");

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();

    const user = new User({
        name,
        email,
        password: hashPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // directly authenticating user
    const token = await User.generateAuthToken();
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
    });

    await sendVerificationEmail(user.email, verificationToken);
    await user.save();
    res.status(200).json({
        message: "User registered successfully",
        user: {
            ...user._doc,
            password: undefined,
        },
    });
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.isPasswordCorrect(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = await User.generateAuthToken();

        user.lastLogin = new Date();
        user.save();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });
        res.status(200).json({
            user: {
                ...user._doc,
                password: undefined,
            },
            token,
            message: "User logged in successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (_, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).send("Please provide verification code");

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        user.isverified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();
        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({ messgae: "you're verified successfully" });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const forgotPassword = async (req, res) => {};

export const resetPassword = async (req, res) => {};
