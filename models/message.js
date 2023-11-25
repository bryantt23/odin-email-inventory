const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true, minLength: 3 },
  text: { type: String, required: true, minLength: 7 }
});

// Export model
module.exports = mongoose.model('Message', MessageSchema);
