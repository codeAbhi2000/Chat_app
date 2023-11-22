const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const fileUpload = require("express-fileupload")
const path = require("path")
// const xss = require('xss')
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/userRoutes')
const grpRoutes = require("./routes/grpRoutes")

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(helmet({
    contentSecurityPolicy : false,
}))
// app.use(xss())
app.use(fileUpload())


const _dirname = path.dirname("Chat_app")
const reactPath = path.join(_dirname,'../client/build')

app.use(express.static(reactPath))

const htmlFiles = (req,res)=>{
    res.sendFile(
        path.join(__dirname,"../client/build/index.html"),(err)=>{
            if(err){
                res.status(500).send(err)
            }
        }
    )
}

app.get('/',htmlFiles)
app.get('/login',htmlFiles)
app.get('/register',htmlFiles)
app.get('/forgotPassword',htmlFiles)
app.get('/resetPassword/:uid/:token',htmlFiles)
app.get('/enterOTP',htmlFiles)
app.get('/dashboard',htmlFiles)
app.get('/dashboard/profile',htmlFiles)
app.get('/dashboard/settings',htmlFiles)
app.get('/dashboard/chats',htmlFiles)
app.get('/dashboard/groups',htmlFiles)




app.use('/auth',authRoutes)
app.use('/user',userRoutes)
app.use("/user",grpRoutes)

module.exports = app
