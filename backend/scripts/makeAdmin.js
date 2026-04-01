import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const email = "vedantborkute2004@gmail.com";

// Upsert — create if not exists, set role to admin
const user = await User.findOneAndUpdate(
  { email },
  {
    $set: { role: "admin" },
    $setOnInsert: {
      name: "Vedant",
      email,
      password: "google",
    },
  },
  { upsert: true, new: true }
);

console.log(`✅ ${user.email} is now an admin (role: ${user.role})`);

await mongoose.disconnect();
