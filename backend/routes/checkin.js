const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Checkin = require("../models/Checkin");

const getCurrentTimeInIST = () => {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * 5.5);
};

const formatDate = (date) => {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });
};
router.post("/checkin", async (req, res) => {
  try {
    const { rollNo } = req.body;

    if (!rollNo) {
      return res.status(400).json({ message: "Roll number is required" });
    }

    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const checkinRecord = await Checkin.findOne({
      rollNo,
      checkIn: { $exists: true },
    });
    if (!checkinRecord) {
      const newCheckin = new Checkin({
        rollNo,
        checkIn: formatDate(getCurrentTimeInIST()),
        slot: student.slot,
      });
      await newCheckin.save();
      res
        .status(200)
        .json({ message: "Check-in successful", checkin: newCheckin });
    } else if (checkinRecord.checkIn && !checkinRecord.checkOut) {
      checkinRecord.checkOut = formatDate(getCurrentTimeInIST());
      await checkinRecord.save();
      return res
        .status(200)
        .json({ message: "check-out successful!!", checkIn: checkinRecord });
      // message = "checkout successfully!!"
    } else {
      return res
        .status(400)
        .json({ message: "you have already checkout today!!" });
      // message = "student already checked-in!!"
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/checkout", async (req, res) => {
  try {
    const { rollNo } = req.body;

    if (!rollNo) {
      return res.status(400).json({ message: "Roll number is required" });
    }

    const checkinRecord = await Checkin.findOne({
      rollNo,
      checkIn: { $exists: true },
    });
    if (!checkinRecord) {
      return res.status(404).json({ message: "No active check-in found" });
    }

    checkinRecord.checkOut = formatDate(getCurrentTimeInIST());
    await checkinRecord.save();

    res
      .status(200)
      .json({ message: "Check-out successful", checkin: checkinRecord });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/checkins", async (req, res) => {
  try {
    const checkins = await Checkin.find({});
    console.log("checkins", checkins);
    res.status(200).json(checkins);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving check-ins" });
  }
});

module.exports = router;
