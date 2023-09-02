const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

const { authenticateToken, checkAdmin } =require("../middleware/isAdminMiddleware")

router.post('/signup', authController.SIGNUP);   //for signup new user creation

// router.post('/login', authenticateToken,checkAdmin,authController.LOGIN);   //for login of that user

router.post('/login',authController.LOGIN);   //for login of that user

router.patch('/forget-password',authController.FORGETPASSWORD); //for updating the password or forget password

router.post('/update-profile',authController.UPDATEPROFILE);//for updating the user profile page via getting email and further process

router.post('/user-profile', authController.USERPROFILE);//for GETting user email via POST method

router.patch('/change-email',authController.CHANGEEMAIL);//for updating the email 

module.exports = router;






