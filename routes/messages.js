const express = require('express');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }

  res.status(401).send('You are not authorized to view this page');
}

router.use(isAuthenticated);

// Require controller modules.
const message_controller = require('../controllers/messageController');

/// MESSAGES ROUTES ///

// GET messages home page.
router.get('/', message_controller.index);

// GET request for creating a Message. NOTE This must come before routes that display Message (uses id).
router.get('/create', message_controller.message_create_get);

// POST request for creating Message.
router.post('/create', message_controller.message_create_post);

// GET request to delete Message.
router.get('/:id/delete', message_controller.message_delete_get);

// GET request to update Message.
router.get('/:id/update', message_controller.message_update_get);

// POST request to update Message.
router.post('/:id/update', message_controller.message_update_post);

module.exports = router;
