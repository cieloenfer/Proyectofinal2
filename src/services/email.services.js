const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});

exports.sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    logger.error('Error sending email:', error);
  }
};

