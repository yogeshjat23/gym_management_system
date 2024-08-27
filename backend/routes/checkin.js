const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Checkin = require("../models/Checkin");

const slots = {
  'slot1': { start: '05:00', end: '06:00' },
  'slot2': { start: '06:00', end: '07:00' },
  'slot3': { start: '07:00', end: '08:00' },
  'slot4': { start: '08:00', end: '09:00' },
  'slot5': { start: '17:00', end: '18:00' },
  'slot6': { start: '18:00', end: '19:00' },
  'slot7': { start: '19:00', end: '20:00' },
  'slot8': { start: '20:00', end: '21:00' },
};




const getCurrentTimeInIST = () => {
  const date = new Date();
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * 5.5));
};

const formatDate = (date) => {
  return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }); 
};






const isValidSlot = (slot) => {
  const currentTime = getCurrentTimeInIST();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const slotTime = slots[slot];
  
  if (!slotTime) {
    
    return false};

  const [startHour, startMinute] = slotTime.start.split(':').map(Number);
  const [endHour, endMinute] = slotTime.end.split(':').map(Number);

  return (
    (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
    (currentHour < endHour )
  );
};


const updateStudentCount = async (rollNo) => {
  try {
    await Student.findOneAndUpdate(
      { rollNo: {$regex: new RegExp(rollNo, 'i')} },
      { $inc: { count: 1 } }
    );
  } catch (err) {
    console.error("Error updating student count:", err.message);
  }
};


router.post("/checkin", async (req, res) => {
  try {
    const { rollNo } = req.body;

    if (!rollNo) {
      return res.status(400).json({ message: "Roll number is required" });
    }

    const student = await Student.findOne({ 
      rollNo : {$regex: new RegExp(rollNo, 'i')}
     });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!isValidSlot(student.slot)) {
      return res.status(400).json({ message: "Not the correct time for your slot" });
    }

    const checkinRecord = await Checkin.findOne({
      rollNo : {$regex: new RegExp(rollNo, 'i')},
      checkIn: { $exists: true },
    });

    if (!checkinRecord) {
      const newCheckin = new Checkin({
        rollNo,
        checkIn: formatDate(getCurrentTimeInIST()),
        slot: student.slot,
      });
      await newCheckin.save();
      await updateStudentCount(rollNo);
      return res.status(200).json({ message: "Check-in successful", checkin: newCheckin });
    } else if (checkinRecord.checkIn && !checkinRecord.checkOut) {
      checkinRecord.checkOut = formatDate(getCurrentTimeInIST());
      await checkinRecord.save();
      return res.status(200).json({ message: "Check-out successful", checkIn: checkinRecord });
    } else {
      return res.status(400).json({ message: "You have already checked out today!" });
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

