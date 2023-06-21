const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
  },

  fullName: {
    type: String,

    number: {
      type: Number,
    },
  },
});

module.exports = mongoose.model('User', userSchema);
