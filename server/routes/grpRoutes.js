const express = require("express")
const validator = require("../middleware/authenticator")

const router = express.Router()

const grpController = require("../controllers/groupController")


router.post("/createGroup",grpController.createGroup)


module.exports = router

