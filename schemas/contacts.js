const mongoose = require('mongoose');


const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  }
}, {
  versionKey: false 
});


const Contact = mongoose.model('Contact', ContactSchema, 'contacts');

module.exports = Contact;