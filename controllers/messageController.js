const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

exports.index = asyncHandler(async (req, res, next) => {
  // Get messages
  const allMessages = await Message.find().sort({ category: 1, text: 1 });
  const jobMessages = allMessages.filter(message => message.category === "Jobs")
  const tinderMessages = allMessages.filter(message => ["Tinder", "General"].includes(message.category))
  res.render('message_list', { messages: { tinderMessages, jobMessages, allMessages }, title: 'Messages List' });
});

// Display message create form on GET.
exports.message_create_get = asyncHandler(async (req, res, next) => {
  // Get categories, which we can use for adding to our message.
  const allCategories = await Message.distinct('category');

  res.render('message_form', {
    page_title: 'Create a Message',
    categories: allCategories,
    message: {}
  });
});

// Handle message create on POST.
exports.message_create_post = [
  // Validate fields.
  body('text', 'Text must not be empty.').trim().isLength({ min: 7 }),
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
      text: req.body.text,
      category: req.body.category
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render('message_form', {
        pageTitle: 'Create Message',
        text: text,
        errors: errors.array()
      });
    } else {
      // Data from form is valid. Save message.
      await message.save();
      res.redirect('/messages');
    }
  })
];

// Handle message delete on POST.
exports.message_delete_get = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect('/messages');
});

// Display message update form on GET.
exports.message_update_get = asyncHandler(async (req, res, next) => {
  // Get message
  const message = await Message.findById(req.params.id);
  // Get categories, which we can use for adding to our message.
  const allCategories = await Message.distinct('category');

  if (message === null) {
    // No results.
    const err = new Error('Message not found');
    err.status = 404;
    return next(err);
  }

  res.render('message_form', {
    page_title: 'Update Message',
    category: message.category,
    text: message.text,
    categories: allCategories,
    message
  });
});

// Handle message update on POST.
exports.message_update_post = [
  // Validate and sanitize fields.
  body('text', 'Text must not be empty.').trim().isLength({ min: 7 }),
  body('category', 'Category must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Message object with escaped and trimmed data.
    const update = {
      text: req.body.text,
      category: req.body.category
    };

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render('message_form', {
        pageTitle: 'Create Message',
        text: req.body.text,
        errors: errors.array()
      });
    } else {
      // Data from form is valid. Update the record.
      const updatedMessage = await Message.findByIdAndUpdate(
        req.params.id,
        update,
        {}
      );
      // Redirect to message detail page.
      res.redirect('/messages');
    }
  })
];
