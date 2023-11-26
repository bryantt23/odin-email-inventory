const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

exports.index = asyncHandler(async (req, res, next) => {
  // Get messages
  const allMessages = await Message.find();

  res.render('message_list', { messages: allMessages, title: 'Messages List' });
});
