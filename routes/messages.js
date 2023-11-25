const express = require('express');
const router = express.Router();

// Require controller modules.
const messages_controller = require('../controllers/messageController');

/// MESSAGES ROUTES ///

// GET messages home page.
router.get('/', messages_controller.index);

module.exports = router;
