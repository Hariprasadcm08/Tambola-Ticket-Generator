const express=require('express')
const router=express.Router()
const {createUser,login}=require('../controller/userController')
const ticketController=require('../controller/ticketController')

//===============================user API'S=======================================================//


//===User Registration==//
router.post('/register',createUser)

//===User Login========//
router.post('/login',login)


//================================================================================================//


//===================================Ticket Api's================================================//

//===============================================================================================//
module.exports=router