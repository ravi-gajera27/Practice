const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  uname: {
    type: String,
    require: true,
  },
  mobileNo: {
    type: String,
    require: true,
  },

});

module.exports = mongoose.model('contact', contactSchema);