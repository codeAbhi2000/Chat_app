const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
// const xss = require('xss')
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/userRoutes')

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(helmet());
// app.use(xss())



app.use('/auth',authRoutes)
app.use('/user',userRoutes)

module.exports = app
