const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/auth')


router.post('/login',authControllers.login)

router.post('/register' , authControllers.signup , authControllers.sentOtp)

router.post('/forgotPassword',authControllers.forgotPassword)
router.post("/send-otp", authControllers.sentOtp);

router.post("/verifyOTP",authControllers.verifyOTP)

module.exports = router