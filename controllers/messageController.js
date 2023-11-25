const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

exports.index = asyncHandler(async (req, res, next) => {
  //   // Get details of books, book instances, authors and genre counts (in parallel)
  //   const [
  //     numBooks,
  //     numBookInstances,
  //     numAvailableBookInstances,
  //     numAuthors,
  //     numGenres
  //   ] = await Promise.all([
  //     Book.countDocuments({}).exec(),
  //     BookInstance.countDocuments({}).exec(),
  //     BookInstance.countDocuments({ status: 'Available' }).exec(),
  //     Author.countDocuments({}).exec(),
  //     Genre.countDocuments({}).exec()
  //   ]);

  res.render('message_list', {
    // title: 'Local Library Home',
    // book_count: numBooks,
    // book_instance_count: numBookInstances,
    // book_instance_available_count: numAvailableBookInstances,
    // author_count: numAuthors,
    // genre_count: numGenres
  });
});
