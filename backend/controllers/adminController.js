import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const admin = rows[0];

    if (admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
console.log("JWT_SECRET =", process.env.JWT_SECRET);
 const token = jwt.sign(
  {
    id: admin.id,
    email: admin.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "24h",
  }
);

res.json({
  success: true,
  message: "Login Successful",
  token,
  admin: {
    id: admin.id,
    name: admin.name,
    email: admin.email,
  },
});
  } catch (error) {
  console.error("LOGIN ERROR:", error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};