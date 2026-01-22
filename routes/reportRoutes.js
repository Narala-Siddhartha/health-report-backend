const express = require("express");
const { downloadReport,updateReport } = require("../controllers/reportController");

const {
  uploadReport,
  getMyReports,
  deleteReport
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadReport
);

router.get("/my", protect, getMyReports);
router.delete("/:id", protect, deleteReport);
router.get("/download/:id", protect, downloadReport);
router.put("/:id", protect, updateReport);


module.exports = router;
