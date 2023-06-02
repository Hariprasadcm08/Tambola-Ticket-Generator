const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId:{
    type: String,
    required: true,
    unique: true,
  },
  numbers: {
    type: [[Number]],
    required: true,
  },
},{timestamps:true});

module.exports = mongoose.model('Ticket', ticketSchema);
