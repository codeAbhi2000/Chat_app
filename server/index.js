const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
// const xss = require('xss')
require("dotenv").config();
const app = express();

const authRoutes = require("./routes/auth");

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(helmet());
// app.use(xss())

const port = process.env.PORT;

app.use('/auth',authRoutes)

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
