import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({ email: req.body.email, password: hash });
  await user.save();
  res.json("Registered");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json("User not found");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.json("Wrong password");

  const token = jwt.sign({ id: user._id }, "secretkey");
  res.json({ token });
});

export default router;
