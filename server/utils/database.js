const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  database: process.env.DB_NAME,
  host: process.env.DN_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (!err) {
    console.log("Connected to database");
  } else {
    console.log("Connection failed");
  }
});

module.exports = db;
