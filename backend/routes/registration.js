const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


router.post('/register', async (req, res) => {
  try {
    const { name, rollNo, hostel, year, slot } = req.body;

    if (!name || !rollNo || !hostel || !year || !slot) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingStudent = await Student.findOne({ 
      rollNo : {$regex: new RegExp(rollNo, 'i')}
     });
    if (existingStudent) {
      return res.status(400).json({ message: 'Already registered' });
    }

    const newStudent = new Student({
      name,
      rollNo,
      hostel,
      year,
      slot
    });

    await newStudent.save();

    res.status(201).json({ message: 'Registration successful', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
