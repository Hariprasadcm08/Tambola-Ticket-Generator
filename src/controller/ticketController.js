const userModel = require('../models/userModel');
const ticketModel = require('../models/ticketModel');

// Check if a number is already used in the ticket
function isNumberAlreadyUsed(ticket, number) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 9; j++) {
        if (ticket && ticket.numbers[i] && ticket.numbers[i][j] === number) {
          return true;
        }
      }
    }
    return false;
  }
  
  

// Generate a new Tambola ticket
function generateTicket(usedNumbers) {
    const ticketId = generateUniqueId();
    const numbers = [];
  
    console.log('Generating ticket:', ticketId);
  
    const columnNumbers = Array.from({ length: 9 }, (_, i) => i + 1);
  
    for (let i = 0; i < 3; i++) {
      const row = [];
      const columnIndices = Array.from({ length: 9 }, (_, i) => i);
  
      for (let j = 0; j < 9; j++) {
        if (i === 1 && j === 4) {
          row.push(0); // Fill the center cell with zero
        } else {
          const columnIndex = Math.floor(Math.random() * columnIndices.length);
          const selectedColumn = columnIndices[columnIndex];
          columnIndices.splice(columnIndex, 1);
  
          const rowIndex = Math.floor(Math.random() * columnNumbers.length);
          const number = columnNumbers[rowIndex];
  
          row[selectedColumn] = number;
          columnNumbers.splice(rowIndex, 1);
  
          usedNumbers.push(number);
        }
      }
  
      numbers.push(row);
    }
  
    console.log('Generated numbers:', numbers);
  
    return {
      ticketId,
      numbers,
    };
  }
  
  

// Generate a unique ticket ID
function generateUniqueId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let ticketId = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    ticketId += characters.charAt(randomIndex);
  }

  return ticketId;
}

// Generate a random number for a specific row and column
function generateRandomNumber(row, column) {
  const startNumber = column * 10 + 1;
  const endNumber = startNumber + 9;

  return Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber;
}

//=============================function to generate  the tickets==================================//
const genTicket = async (req, res) => {
    const { numOfTickets } = req.body;
    const usedNumbers = [];
  
    try {
      const ticketIds = [];
  
      for (let i = 0; i < numOfTickets; i++) {
        const ticket = new ticketModel(generateTicket(usedNumbers));
        const savedTicket = await ticket.save();
        ticketIds.push({ ticketId: savedTicket.ticketId, number: savedTicket.numbers[0][0] });
      }
  
      const limitedTicketIds = ticketIds.slice(0, numOfTickets); // Slice the array to match numOfTickets
  
      res.send({ ticketIds: limitedTicketIds });
    } catch (error) {
      console.error('Failed to create tickets', error);
      res.status(500).json({ error: 'Failed to create tickets' });
    }
  };
  

//==============================fetch the tickets=========================================================//
const fetchTickets = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const tickets = await ticketModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.json(tickets);
  } catch (error) {
    console.error('Failed to fetch tickets', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

module.exports = { genTicket, fetchTickets };
