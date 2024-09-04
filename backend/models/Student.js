const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    StudentDetails: {
      start_date: { type: Date },
      studentData: [{ type: mongoose.Schema.Types.Mixed }],
    },
    BackupStudentDetails: {
      start_date: { type: Date },
      studentData: [{ type: mongoose.Schema.Types.Mixed }],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Student", studentSchema);
