const express = require("express");
const {
  getAllUsers,
  approveUser
} = require("../controllers/adminController");

const {
  getAllReports,
  getReportsByUser
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all users
router.get("/users", protect, adminOnly, getAllUsers);

// Approve user
router.put("/approve/:userId", protect, adminOnly, approveUser);

router.get("/reports", protect, adminOnly, getAllReports);
router.get("/reports/:userId", protect, adminOnly, getReportsByUser);

module.exports = router;
