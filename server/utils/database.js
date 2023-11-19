const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  timezone:'Z'
});

db.connect((err) => {
  if (!err) {
    console.log("Connected to database");
  } else {
    console.log(err.stack);
    console.log("Connection failed");
  }
});

module.exports = db;
