const express= require('express');
const { getuserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router= express.Router();

router.get('/getuser',authMiddleware, getuserController)

router.put('/update',authMiddleware, updateUserController)

router.post('/updatePassword', authMiddleware, updatePasswordController)

router.post('/resetPassword', authMiddleware, resetPasswordController)

router.delete('/deleteUser/:id', authMiddleware, deleteProfileController)
module.exports= router;