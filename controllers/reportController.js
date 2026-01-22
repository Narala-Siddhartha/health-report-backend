const Report = require("../models/Report");
const fs = require("fs");

// Upload report
exports.uploadReport = async (req, res) => {
  try {
    const { reportType, doctorName, reportDate, notes } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const report = await Report.create({
      user: req.user._id,
      fileName: req.file.filename,
      filePath: req.file.path,
      reportType,
      doctorName,
      reportDate,
      notes
    });

    res.status(201).json({
      message: "Report uploaded successfully",
      report
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's reports
exports.getMyReports = async (req, res) => {
    const reports = await Report.find({ user: req.user._id });
    res.json(reports);
  };

  exports.deleteReport = async (req, res) => {
    const report = await Report.findById(req.params.id);
  
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
  
    // Ensure ownership
    if (report.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
  
    // Delete file from disk
    fs.unlinkSync(report.filePath);
  
    await report.deleteOne();
  
    res.json({ message: "Report deleted successfully" });
  };

  // Download report
exports.downloadReport = async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);
  
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
  
      // Authorization check:
      // Owner OR Admin
      if (
        report.user.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      res.download(report.filePath);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update report metadata
exports.updateReport = async (req, res) => {
    try {
      const { reportType, doctorName, reportDate, notes } = req.body;
  
      const report = await Report.findById(req.params.id);
  
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
  
      // Only owner can edit
      if (report.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      // Update allowed fields only
      report.reportType = reportType || report.reportType;
      report.doctorName = doctorName || report.doctorName;
      report.reportDate = reportDate || report.reportDate;
      report.notes = notes || report.notes;
  
      await report.save();
  
      res.json({
        message: "Report updated successfully",
        report
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  