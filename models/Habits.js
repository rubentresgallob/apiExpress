const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  frequency: String,
  streak: { type: Number, default: 0 }
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
