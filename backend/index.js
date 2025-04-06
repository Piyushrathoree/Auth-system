import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import router from "./routes/auth.route.js";
import cors from 'cors'
dotenv.config();
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // Replace with frontend URL
        credentials: true, // Allow cookies & auth headers
    })
);

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',router )
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`our server is running on ${PORT}`);
    });
});
