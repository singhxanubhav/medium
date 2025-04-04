import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { signinInput, signupInput } from "@anubhavxsingh/common-blog";
dotenv.config();
const useRouter = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
}
useRouter.use(bodyParser.json());
useRouter.post("/signup", async (req, res) => {
    try {
        const parseResult = signupInput.safeParse(req.body);
        if (!parseResult.success) {
            res.status(411).json({
                message: "Inputs not correct"
            });
            return;
        }
        const { name, username, password } = parseResult.data;
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            // @ts-ignore
            data: { name, username, password: hashedPassword },
        });
        // Generate JWT Token
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        res.json({ jwt: token,
            email: user.username
        });
    }
    catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Error signing up" });
    }
});
useRouter.post("/signin", async (req, res) => {
    try {
        const parseResult = signinInput.safeParse(req.body);
        if (!parseResult.success) {
            res.status(411).json({
                message: "Inputs not correct"
            });
            return;
        }
        const { username, password } = parseResult.data;
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            return res.status(403).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        res.json({ jwt: token,
            email: user.username
        });
    }
    catch (error) {
        console.error("Signin Error:", error);
        res.status(500).json({ error: "Error signing in" });
    }
});
export default useRouter;
