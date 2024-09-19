const userModel = require("../models/userModel")

const bcrypt= require('bcryptjs')
// GET USER CONTROLLER

const getuserController= async(req, resp)=>{
    // resp.status(200).send({
    //     sucess: true,
    //     message: 'user Data'
    // })

    // console.log(req.body.id)

    try {
        // find user
        // const user= await userModel.findById({_id:req.body.id}, {_id: 0})   // *** here Id is not show
        const user= await userModel.findById({_id:req.body.id})
        // validation
        if(!user){
            return resp.status(404).send({
                sucess: false,
                message:'User not Found'
            })
        }
        user.password= undefined

        resp.status(200).send({
            sucess: true,
            message:' User Get Sucessfully',
            user
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            sucess: false,
            message: 'Erron in getUser API',
            error
        })
    }
}

// UPDATE CONTROLLER

const updateUserController= async(req, resp)=>{
    try {
        // find user
        const user= await userModel.findById({_id: req.body.id})
        // validation
        if(!user){
            return resp.status(404).send({
                sucess: false,
                message:'User not Found'
            })
        }
        // Update User
        const {userName, address, phone}= req.body
       
        if(userName) user.userName= userName;
        if(address) user.address= address;
        if(phone) user.phone= phone;

        //  SAVE USER
        await user.save();
        resp.status(200).send({
            sucess: true,
            message:' User Upadate sucessfully',
            user
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            sucess: false,
            message: 'Erron in update user API'
        })
        
    }
}

// UPDATE PASSWORD
const updatePasswordController= async(req, resp)=>{
    try {
        // find user
        const user= await userModel.findById({_id: req.body.id})
        if(!user){
            return resp.status(404).send({
                sucess: false,
                message: "User not found"
            })
        }
        // get data from user
        const {oldPassword, newPassword}= req.body
        if(!oldPassword || !newPassword){
            return resp.status(500).send({
                sucess: false,
                message:' please provide old and new password'
            })
        }

            // decrypt password
    const isMatch= await bcrypt.compare(oldPassword, user.password)
    if(!isMatch){
        return resp.status(500).send({
            sucess: false,
            message: 'Old Password is Incorrect'
        })
    }
    

    // Encrypt the new password
    var salt = bcrypt.genSaltSync(10);
        const hashedPassword= await bcrypt.hash(newPassword, salt)
        user.password= hashedPassword
        await user.save();

        resp.status(200).send({
            sucess: true,
            message:"Password Update successfully"
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            sucess: false,
            message:'Error in Update password API',
            error
        })
        
    }
}

// RESET PASSWORD
const resetPasswordController= async(req, resp)=>{
    try {
        const {email, answer, newPassword}= req.body
        if(!email || !answer || !newPassword){
            return resp.status(500).send({
                sucess: false,
                message:"Please provide all fields"
            })
        }
        const user= await userModel.findOne({email, answer})
        if(!user){
            return resp.status(404).send({
                sucess: false,
                message: 'User not Found or Invalid answer'
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword= await bcrypt.hash(newPassword, salt)
        user.password= hashedPassword
        await user.save();

        resp.status(200).send({
            sucess: true,
            message:'Password reset successfully'
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            sucess: false,
            message:'Error in Reset Password API',
            error
        })
        
    }
}


// DELETE USER 
const deleteProfileController= async(req, resp)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return resp.status(200).send({
            sucess: true,
            message:' Your Account has been Deleted'
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            sucess: false,
            message:'Error in Delete Profiel API',
            error
        })
        
    }
}
module.exports= {getuserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController} 