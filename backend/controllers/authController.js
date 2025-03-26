const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');
const { authDB } = require('../config/db');
require('dotenv').config();

// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
  
//   try {
//     const user = await createUser(name, email, hashedPassword, role);
//     res.status(201).json({ message: "User registered", userId: user.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.register = async (req, res) => {
  try {
    console.log("Received Data from Frontend:", req.body);
      const { name, email, password } = req.body; // Ensure role is included
      const role = 'farmer';
    
      if (!name || !email || !password) {
          return res.status(400).json({ error: "All fields are required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await authDB.query(
          "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
          [name, email, hashedPassword, role]
      );

      res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if user exists
      const userResult = await authDB.query('SELECT * FROM users WHERE email = $1', [email]);

      if (userResult.rows.length === 0) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = userResult.rows[0];

      //  Verify password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn:  process.env.JWT_EXPIRES_IN }
      );

      res.json({ token });
  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
