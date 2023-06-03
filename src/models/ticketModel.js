const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String },
  numbers: { type: [[Number]], required: true },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Ticket', ticketSchema);
