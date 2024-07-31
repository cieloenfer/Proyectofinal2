const passport = require('passport');
const User = require('../models/user.model');

exports.isAuthenticated = passport.authenticate('jwt', { session: false });

exports.updateLastConnection = async (req, res, next) => {
  if (req.user) {
    req.user.last_connection = new Date();
    await req.user.save();
  }
  next();
};

