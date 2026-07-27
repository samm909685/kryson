import express from "express";
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
router.post("/", addMedicine);

router.get("/verify/:token", verifyMedicine);

router.get("/dashboard/stats", getDashboardStats);

router.get("/scan-history", getScanHistory);

router.delete("/scan-history", clearScanHistory);

router.get("/", getMedicines);

router.get("/:id", getMedicineById);

router.put("/:id", updateMedicine);

router.delete("/:id", deleteMedicine);
export default router;