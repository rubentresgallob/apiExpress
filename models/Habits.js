const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  frequency: { type: String, required: true },
  goalPerPeriod: { type: Number, required: true },
  unit: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);