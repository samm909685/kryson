import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addMedicine,
  getMedicines,
  getMedicineById,
  verifyMedicine,
  updateMedicine,
  deleteMedicine,
  getDashboardStats,
  getScanHistory,
  clearScanHistory,
} from "../controllers/medicineController.js";

const router = express.Router();

// ==========================
// ADD MEDICINE
// ==========================
router.post("/", authMiddleware, addMedicine);

router.get("/verify/:token", verifyMedicine);

router.get("/dashboard/stats", authMiddleware, getDashboardStats);

router.get("/scan-history", authMiddleware, getScanHistory);

router.delete("/scan-history", authMiddleware, clearScanHistory);

router.get("/", authMiddleware, getMedicines);

router.get("/:id", authMiddleware, getMedicineById);

router.put("/:id", authMiddleware, updateMedicine);

router.delete("/:id", authMiddleware, deleteMedicine);
export default router;