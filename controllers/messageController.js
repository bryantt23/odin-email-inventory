const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

exports.index = asyncHandler(async (req, res, next) => {
  // Get messages
  const allMessages = await Message.find();

  res.render('message_list', { messages: allMessages, title: 'Messages List' });
});

// Display message create form on GET.
exports.message_create_get = asyncHandler(async (req, res, next) => {
  // Get categories, which we can use for adding to our message.
  const allCategories = await Message.distinct('category');

  res.render('message_form', {
    title: 'Create a Message',
    categories: allCategories
  });
});
