// import express from "express";
import type { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// import * as jwt from "jsonwebtoken";

import {User} from '../models/authModel.js';





export const handleSignUp = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create user
    const user = new User({
      email,
      name,
      password: hashedPassword
    });

    // 4. Save to DB
    await user.save();

    // 5. Respond
    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};








export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User account not found" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // 4. Generate tokens
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: "5h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN as string,
      { expiresIn: "1d" }
    );

    // 5. Response
     res.status(200).json({
      message: "Login successful",
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error?.message || "Server error" });
  }
};
