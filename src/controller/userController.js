const userModel=require('../models/userModel')
const ticketModel=require('../models/ticketModel')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const {isValidObjectId ,validUserName,isValidEmail,isValidPswd}=require('../validators')


const createUser=async function(req,res){
    try{
    let data=req.body
    let {password,emailId,username}=data
    if(Object.keys(data).length==0)return res.status(400).send({status:false,msg:"can't create data with empty body"})

       let newArr=["password","emailId","username"]
       for(i of newArr){
        if(!data[i])return res.status(400).send({status:false,msg:` ${i} is mandatory please input ${i}`})
       }


        let array=Object.keys(data)
        for(i of array){
         if(data[i].trim()=="")return res.status(400).send({status:false,msg:` ${i} can't be empty`})
        }
        if(!isValidEmail(emailId.trim()))return res.status(400).send({status:false,msg:"please enter a valid email"})
        if(!isValidPswd(password.trim()))return res.status(400).send({status:false,msg:"please enter a valid password"})
        if(!validUserName(username.trim()))return res.status(400).send({status:false,msg:"please enter a valid username"})
        let uniquenessCheck=await userModel.findOne({$or: [{ email: emailId },{ username:username}]})
        if(uniquenessCheck){return res.status(404).send({status:false,message:"username or emailId already exist"})}
    

    password = await bcrypt.hash(password, 10)
    let create=await userModel.create({...data, password })
    return res.status(201).send({status:true,message:"user registered successfully",data:create})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

const login=async function(req,res){
    try{
        let data= req.body
        let  {emailId,password} = data
            if(Object.keys(req.body).length==0){
                return res.status(400).send({status:false,message:"can not login without credentials"})
            }
           
         
            if(!isValidEmail(emailId.trim())){
                return res.status(400).send({status:false,message:"Email is invalid"})
            }
           
        
            let findUser= await userModel.findOne({emailId: emailId })
            if(!findUser){return res.status(404).send({status:false,message:"User not found"})}
            let hash= findUser.password
            let bcryptpwd= await bcrypt.compare(password.trim(), hash)
            if(!bcryptpwd){return res.status(400).send({status:false,message:"please put correct password "})}
           
        
            let token= jwt.sign({userId:findUser._id},"tiket api's",{expiresIn:"10d"})
           let obj= {userId:findUser["_id"],token}
        
            return res.status(200).send({status:true,message:"User login successfull",data:obj})
     }
     catch(error){
            return res.status(500).send({status:false,message:error.message})
        }
    }





module.exports={createUser,login}