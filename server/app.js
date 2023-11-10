const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const fileUpload = require("express-fileupload")
// const xss = require('xss')
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/userRoutes')
const grpRoutes = require("./routes/grpRoutes")

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(helmet());
// app.use(xss())
app.use(fileUpload())



app.use('/auth',authRoutes)
app.use('/user',userRoutes)
app.use("/user",grpRoutes)

module.exports = app
