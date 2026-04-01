import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const email = "abc@gmail.com";
const existing = await User.findOne({ email });

if (existing) {
  console.log("✅ User already exists:", email);
} else {
  const hashed = await bcrypt.hash("123", 10);
  await User.create({ name: "Test User", email, password: hashed, role: "user" });
  console.log("✅ Test user created — email: abc@gmail.com | pass: 123");
}

await mongoose.disconnect();
