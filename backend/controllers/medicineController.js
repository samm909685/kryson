import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ==========================
// ADD MEDICINE
// ==========================
export const addMedicine = async (req, res) => {
  try {
    const {
      product_name,
      generic_name,
      batch_number,
      manufacturer,
      manufacturing_date,
      expiry_date,
      description,
      image,
    } = req.body;

    const verification_token = uuidv4();

    const query = `
      INSERT INTO medicines
      (
        product_name,
        generic_name,
        batch_number,
        manufacturer,
        manufacturing_date,
        expiry_date,
        description,
        image,
        verification_token
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(query, [
      product_name,
      generic_name,
      batch_number,
      manufacturer,
      manufacturing_date,
      expiry_date,
      description,
      image,
      verification_token,
    ]);

    res.status(201).json({
      success: true,
      message: "Medicine Added Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// GET ALL MEDICINES
// ==========================
export const getMedicines = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM medicines ORDER BY id DESC"
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch medicines",
    });
  }
};

// ==========================
// GET SINGLE MEDICINE
// ==========================
export const getMedicineById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM medicines WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// VERIFY MEDICINE
// ==========================
export const verifyMedicine = async (req, res) => {
  try {
    const { token } = req.params;

    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "Unknown";

    const userAgent =
      req.headers["user-agent"] || "Unknown";

    const [rows] = await pool.query(
      "SELECT * FROM medicines WHERE verification_token = ?",
      [token]
    );

    // Invalid Product
    if (rows.length === 0) {
      await pool.query(
        `INSERT INTO scan_history
        (medicine_id, verification_token, status, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?)`,
        [null, token, "INVALID", ip, userAgent]
      );

      return res.status(404).json({
        success: false,
        message: "Invalid Product",
      });
    }

    const medicine = rows[0];

    // Valid Product
    await pool.query(
      `INSERT INTO scan_history
      (medicine_id, verification_token, status, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?)`,
      [medicine.id, token, "VALID", ip, userAgent]
    );

    res.status(200).json({
      success: true,
      medicine,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ==========================
// UPDATE MEDICINE
// ==========================
export const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      product_name,
      generic_name,
      batch_number,
      manufacturer,
      manufacturing_date,
      expiry_date,
      description,
      image,
    } = req.body;

    const query = `
      UPDATE medicines
      SET
        product_name = ?,
        generic_name = ?,
        batch_number = ?,
        manufacturer = ?,
        manufacturing_date = ?,
        expiry_date = ?,
        description = ?,
        image = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(query, [
      product_name,
      generic_name,
      batch_number,
      manufacturer,
      manufacturing_date,
      expiry_date,
      description,
      image,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.json({
      success: true,
      message: "Medicine updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// DELETE MEDICINE
// ==========================
export const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM medicines WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
    
  }
};
// ==========================
// DASHBOARD STATS
// ==========================
export const getDashboardStats = async (req, res) => {
  try {
    const [medicineCount] = await pool.query(
      "SELECT COUNT(*) AS total FROM medicines"
    );

    const [qrCount] = await pool.query(
      "SELECT COUNT(*) AS total FROM medicines"
    );

    const [verifiedCount] = await pool.query(
      "SELECT COUNT(*) AS total FROM scan_history WHERE status='VALID'"
    );

    const [scanCount] = await pool.query(
      "SELECT COUNT(*) AS total FROM scan_history"
    );

    res.json({
      totalMedicines: medicineCount[0].total,
      totalQR: qrCount[0].total,
      verifiedProducts: verifiedCount[0].total,
      totalScans: scanCount[0].total,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// GET SCAN HISTORY
// ==========================
export const getScanHistory = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        sh.id,
        sh.verification_token,
        sh.status,
        sh.ip_address,
        sh.user_agent,
        sh.scanned_at,

        m.product_name,
        m.batch_number

      FROM scan_history sh

      LEFT JOIN medicines m
      ON sh.medicine_id = m.id

      ORDER BY sh.scanned_at DESC
    `);

    res.status(200).json(rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ==========================
// CLEAR SCAN HISTORY
// ==========================
export const clearScanHistory = async (req, res) => {
  try {
    await pool.query("DELETE FROM scan_history");

    res.json({
      success: true,
      message: "Scan history cleared successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};