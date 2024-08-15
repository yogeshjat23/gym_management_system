const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hostel: { type: String, required: true },
  year: { type: String, required: true },
  slot: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
