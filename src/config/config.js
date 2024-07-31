module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    email: process.env.EMAIL || 'your_email@gmail.com',
    emailPassword: process.env.EMAIL_PASSWORD || 'your_email_password',
    clientURL: process.env.CLIENT_URL || 'http://localhost:3000',
};
