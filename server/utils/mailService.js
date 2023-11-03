const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abhishekvvet@gmail.com',
        pass: process.env.M_API_KEY
    }
});




module.exports = transporter