const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    filePath: {
      type: String,
      required: true
    },
    reportType: {
      type: String,
      required: true
    },
    doctorName: {
      type: String
    },
    reportDate: {
      type: Date
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
