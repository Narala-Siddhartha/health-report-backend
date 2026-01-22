const User = require("../models/User");
const Report = require("../models/Report");

// Get all reports
exports.getAllReports = async (req, res) => {
  const reports = await Report.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(reports);
};

// Get reports of a specific user
exports.getReportsByUser = async (req, res) => {
  const reports = await Report.find({ user: req.params.userId })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(reports);
};


// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Approve user
exports.approveUser = async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isApproved = true;
  await user.save();

  res.json({ message: "User approved successfully" });
};

// Get all reports
exports.getAllReports = async (req, res) => {
  const reports = await Report.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(reports);
};

// Get reports of a specific user
exports.getReportsByUser = async (req, res) => {
  const reports = await Report.find({ user: req.params.userId })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(reports);
};
