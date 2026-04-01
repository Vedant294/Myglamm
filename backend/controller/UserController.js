import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class UserController {
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(401).json({ message: "user already exists" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });
     
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "30d" });
      res.status(201).json({
        message: "user created successfully",
        token,
        user: { name: newUser.name, email: newUser.email, role: newUser.role },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "user creation failed", error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (!userExists) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isMatch = await bcrypt.compare(password, userExists.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: userExists._id, role: userExists.role }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(200).json({
        message: "User loggedIn successfully",
        token,
        user: {
          name: userExists.name,
          email: userExists.email,
          role: userExists.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred during login" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch users", error: error.message });
    }
  }
}

export default new UserController();
