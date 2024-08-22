// mailService.js
const formData = require('form-data');
const Mailgun = require('mailgun.js');
require('dotenv').config();

// Create an instance of Mailgun with formData
const mailgun = new Mailgun(formData);

// Setup the client with authentication details
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere',
  url: process.env.MAILGUN_API_URL || 'https://api.mailgun.net' // Use EU URL if neede
});

/**
 * Send an email using Mailgun
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject of the email
 * @param {string} html - HTML content of the email
 * @param {string} [from] - Optional sender email address (default is noreply)
 * @returns {Promise<Object>} - Promise resolving with Mailgun response or error
 */
const sendMail = async ({ to, subject, html, from }) => {
  try {
    // Prepare mail options
    const mailOptions = {
      from: from || `noreply@${process.env.MAILGUN_DOMAIN}`, // Default 'from' address
      to: [to], // Convert recipient to array
      subject,
      html,
    };

    // Send email
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, mailOptions);
    console.log('Mailgun Response:', response);
    return { status: 'success', response };
  } catch (error) {
    console.error('Mailgun Error:', error);
    return { status: 'error', error };
  }
};

module.exports = sendMail;
