import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "OK",
      message: "Backend Connected",
    });
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: "Database Connection Failed",
    });
  }
});

// Admin Routes
app.use("/api/admin", adminRoutes);
app.use("/api/medicines", medicineRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});