const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  category: { type: String, required: true },
  text: { type: String, required: true, minLength: 2 }
});

// Export model
module.exports = mongoose.model('Message', MessageSchema);
