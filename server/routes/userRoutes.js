const express = require('express')
const validator = require('../middleware/authenticator')

const router = express.Router()

const userController = require('../controllers/userController')

router.get('/getOtherUsers/:id',validator,userController.getAllOtherVerifiedUsers)
router.get('/getAllUsers/:id',validator,userController.getAllVerifiedUsers)
router.get('/getFriends/:id',validator,userController.getFriends)
router.get('/getFriendRequests/:id',validator,userController.getRequests)
router.post('/updateProfile',validator,userController.updateProfile)

module.exports = router