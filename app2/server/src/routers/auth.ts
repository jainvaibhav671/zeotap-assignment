import { Router } from "express";
import { UserModel } from "../db/models/user";
import bcrypt from "bcryptjs"
import env from "../lib/env"
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("login", req.body)

        // Check if the user exists
        // @ts-ignore
        const user = await UserModel.findOne({ email });

        if (!user) {
            console.log("Email not found")
            res.send({
                authorized: false,
                message: "Email not found"
            });
            return
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            console.log("Password not match")
            res.send({
                authorized: false,
                message: "Invalid password"
            })
            return
        }

        const token = jwt.sign(user.toJSON(), env.JWT_SECRET, { expiresIn: "1d" })

        // Set the token in cookie
        res.cookie("token", token, {
            expires: new Date(Date.now() + 3600000),
            path: "/",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: process.env.NODE_NV === "production" ? "none" : "lax"
        })

        // If the user exists and the password matches, return the user
        res.send({
            authorized: true,
            message: "Logged in successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

router.post("/register", async (req, res) => {
    try {

        const { name, email, password, confirmPassword } = req.body;
        console.log(req.body)

        // Check if the user exists
        const user = await UserModel.findOne({ email });

        if (user) {
            res.status(400).send("Email already exists");
            return
        }

        // Check if the passwords match
        if (password !== confirmPassword) {
            res.status(400).send("Passwords do not match");
            return
        }

        // Hash the password
        const passwordHash = bcrypt.hashSync(password, 10);

        // Create the user
        const new_user = new UserModel({
            email,
            passwordHash,
            name,
            joinedAt: new Date()
        });

        // Save the user to the database
        await new_user.save().catch((err) => {
            console.log(err)
            res.status(400).send({ message: "Internal Server Error" })
        });

        const token = jwt.sign(new_user.toJSON(), env.JWT_SECRET, { expiresIn: "1d" })

        // Set the token in cookie
        res.cookie("token", token, {
            expires: new Date(Date.now() + 3600000),
            path: "/",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: process.env.NODE_NV === "production" ? "none" : "lax"
        })

        res.send({
            authorized: true,
            user: new_user.toJSON()
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});

router.get("/logout", (req, res) => {
    const token = req.cookies.token
    if (typeof token === "undefined") {
        console.log("No token provided.")
        res.send({ authorized: false, message: "No token provided." })
        return
    }

    res.clearCookie("token")
    res.status(200).send({ message: "Logged out successfully" })
})

router.get("/authenticated", (req, res) => {
    const token = req.cookies.token;

    if (typeof token === "undefined") {
        console.log("No token provided.");
        res.send({ authorized: false, message: "No token provided." });
        return
    }

    jwt.verify(token, env.JWT_SECRET, (err: any) => {
        if (err) {
            console.error("Token verification failed:", err);
            res.send({ authorized: false, message: "Invalid token." });
            return
        }

        console.log("Token verified successfully:");
        res.status(200).send({ authorized: true });
    });
});

export default router;
