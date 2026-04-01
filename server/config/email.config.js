const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "pandeyanupam180@gmail.com",
    pass: "nhhr ekzp gluw okyb",
  },
});

module.exports = { transporter };