const mongoose= require("mongoose")

//=========================================VALIDATIONS=====================================================//

const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}



  const isValidEmail = (Email) => {
    return  /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email)
  }
  
  const isValidPswd = (Password) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(Password)
  }

  const validUserName=()=>{
    return /^(?=.*[a-zA-Z])(?!.*\d)[a-zA-Z\d]{1,17}$/
}


  module.exports={isValidObjectId ,validUserName,isValidEmail,isValidPswd}