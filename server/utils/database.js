const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  database: process.env.DB_NAME,
  host: process.env.DN_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port:"10000",
  timezone:'Z'
});

db.connect((err) => {
  if (!err) {
    console.log("Connected to database");
  } else {
    console.log(err);
    console.log("Connection failed");
  }
});

module.exports = db;
