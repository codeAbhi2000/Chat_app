const express = require("express")
const validator = require("../middleware/authenticator")

const router = express.Router()

const grpController = require("../controllers/groupController")


router.post("/createGroup",validator,grpController.createGroup)
router.get('/getParticipantsDetails/:group_id',validator,grpController.getParticipantDetails)
router.post('/makeAdmin',validator,grpController.makeAdmin)
router.post('/dismissAdmin',validator,grpController.disMissAdmin)
router.post('/removeGroupParticipants',validator,grpController.removeGroupParticipants)


module.exports = router

