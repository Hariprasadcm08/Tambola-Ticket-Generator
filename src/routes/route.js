const express=require('express')
const router=express.Router()
const {createUser,login}=require('../controller/userController')
const {genTicket,fetchTickets}=require('../controller/ticketController')
const {authenticate,authorization}=require('../auth')

//===============================user API'S=======================================================//


//1.===User Registration==//
router.post('/register',createUser)

//2.===User Login========//
router.post('/login',login)


//================================================================================================//


//===================================Ticket Api's================================================//
//1.generating tickets
router.post('/genTickets',authenticate,genTicket) 

//2.Fetch the tickets 
router.get('/fetchTickets' , authenticate , fetchTickets)
//===============================================================================================//
module.exports=router