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
// router.post('/messages/create', message_controller.message_create_post);

module.exports = router;
