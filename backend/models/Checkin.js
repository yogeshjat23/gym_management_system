const mongoose = require('mongoose');

const checkinSchema = new mongoose.Schema({
  rollNo: { type: String, required: true },
  checkIn: { type: String },
  checkOut: { type: String },
  slot: { type: String }
});

const Checkin = mongoose.model('Checkin', checkinSchema);

module.exports = Checkin;
