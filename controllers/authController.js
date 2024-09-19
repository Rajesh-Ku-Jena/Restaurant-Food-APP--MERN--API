const userModel = require("../models/userModel")
const bcrypt= require('bcryptjs')
const JWT= require('jsonwebtoken')

// REGISTER
const registerController= async(req, resp)=>{
       try {
        const {userName, email, password, address, phone, answer}= req.body
        // validation
        if(!userName || !email || !password || !address || !phone || !answer){
            return resp.status(500).send({
                sucess: false,
                message: 'please provide all fields ',
            })
        }
        // check user
        const existing= await userModel.findOne({email})
        if(existing){
            return resp.status(500).send({
                sucess: false,
                message: 'Already Registered Email please LOGIN'
            })
        }
        // encryption password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword= await bcrypt.hash(password, salt)
        // create new user
        const user= await userModel.create({userName, email, password:hashedPassword, address, phone,answer})
        resp.status(201).send({
            success: true,
            message:'Successfully Registered',
            user
        })
       } catch (error){
        console.log(error)
         resp.status(500).send({
            sucess: false,
            message: 'Error in Register API ',
            error
        })
       }
}
// LOGIN
const loginController= async(req, resp)=>{
try {
    const {email, password}= req.body
    if(!email || !password){
       return resp.status(500).send({
        sucess: false,
        message:'Please provid valid email and password'
       })
    }
    // check user
    const user= await userModel.findOne({email})
    if(!user){
        return resp.status(404).send({
            success: false,
            message:'User not Exist'
        })
    }
    // decrypt password
    const isMatch= await bcrypt.compare(password, user.password)
    if(!isMatch){
        return resp.status(500).send({
            sucess: false,
            message: 'Password Incorrect'
        })
    }
    // JSON WEB TOKEN CREATE
    const token= JWT.sign({id:user._id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
    user.password= undefined
    resp.status(200).send({
        success: true,
        message:"login sucessfully",
        token,
        user
    })
    
} catch (error) {
    console.log(error);
    resp.status(500).send({
        success: false,
        message:'Error in Login API',
        error
    })
}
}
module.exports= {registerController, loginController}