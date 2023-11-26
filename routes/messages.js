const express = require('express');
const router = express.Router();

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

module.exports = router;
