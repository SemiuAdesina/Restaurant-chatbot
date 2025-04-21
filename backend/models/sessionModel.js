const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  currentOrder: { type: Array, default: [] },
  orderHistory: { type: Array, default: [] },
  isSelectingFood: { type: Boolean, default: false },  // ADD THIS
});

module.exports = mongoose.model('Session', sessionSchema);
