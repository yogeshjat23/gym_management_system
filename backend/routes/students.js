
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


router.get('/students/all', async (req, res) => {
  try {
    const students = await Student.find({}).sort({ count: 1 });
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Error fetching students');
  }
});


router.delete('/students/:rollNo', async (req, res) => {
  try {
    const { rollNo } = req.params;
    const result = await Student.findOneAndDelete({ rollNo });

    if (!result) {
      return res.status(404).send('Student not found');
    }

    res.send('Student deleted successfully');
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send('Error deleting student');
  }
});

module.exports = router;
