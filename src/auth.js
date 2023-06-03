const jwt = require('jsonwebtoken');
const {isValidObjectId}=require('./validators')

const authenticate = (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
        jwt.verify(token, "tiket api's", function (err, decode) {
            if (err) { return res.status(401).send({ status: false, data: "invalid token" }) }
            req.decode = decode;
            next();
        })
    } catch (error) {
        res.status(500).send({ status: false, msg: error });

    }
}

let authorization=async function(req,res,next){
    try{
let token=req.decodedToken
let tokenUser=token.userId
let user=req.params.userId

if(!isValidObjectId(user))return res.status(400).send({status:false,message:"please enter a valid userid to get in"})
let UserData=await userModel.findById(user)
if(!UserData)return res.status(404).send({status:false,msg:"No such user present with this userid in our Db"})
if(tokenUser!=user)return res.status(403).send({status:false,msg:"you are not authorised to do this"})
next()

    }
    catch(err){
        return res.status(500).send({ status: false, error: err.message })
    }
}


module.exports = {authenticate,authorization};