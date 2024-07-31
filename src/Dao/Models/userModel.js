const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: 'user'
  },
  documents: [{
    name: String,
    reference: String
  }],
  last_connection: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;

