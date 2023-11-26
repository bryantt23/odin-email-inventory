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

// Handle message create on POST.
exports.message_create_post = [
  // Validate and sanitize fields.
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body('text', 'Text must not be empty.').trim().isLength({ min: 7 }).escape(),
  body('category', 'Category must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Message object with escaped and trimmed data.
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      category: req.body.category
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render('message_form', {
        title: 'Create Message',
        text: text,
        errors: errors.array()
      });
    } else {
      // Data from form is valid. Save message.
      await message.save();
      res.redirect('/messages/');
    }
  })
];
