const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const Message = require('../models/message')

// Get message categories
router.get('/messages/categories', async (req, res) => {
    try {
        // Get categories, which we can use for adding to our message.
        const allCategories = await Message.distinct('category')
        res.json(allCategories)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})

// Get all messages
router.get('/messages', async (req, res) => {
    try {
        const allMessages = await Message.find().sort({ category: 1, text: 1 })
        const jobMessages = allMessages.filter(message => message.category === "Jobs");
        const tinderMessages = allMessages.filter(message => ["Tinder", "General", "OkCupid", "Hinge", "CMB", "Badoo", "TanTan"].includes(message.category));

        const structuredMessages = {
            messages: {
                tinderMessages,
                jobMessages,
                allMessages
            },
            title: 'Messages List'
        }
        res.json(structuredMessages)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Handle message delete
router.delete('/messages/:id', async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' })
        }
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/messages/:id/archive', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id)
        if (!message) {
            return res.status(404).json({ error: "Message not found" })
        }

        message.isArchived = !message.isArchived;
        await message.save()

        res.json({ success: true, message })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Get message
router.get('/messages/:id', async (req, res) => {
    try {
        // Get message
        const message = await Message.findById(req.params.id);
        // Get categories, which we can use for adding to our message.
        const allCategories = await Message.distinct('category');

        if (message === null) {
            // No results.
            return res.status(404).json({ error: "Message not found" })
        }
        res.json({ message, allCategories })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Handle message update on PUT.
router.put('/messages/:id', [
    // Validate and sanitize fields.
    body('text', 'Text must not be empty.').trim().isLength({ min: 7 }),
    body('category', 'Category must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async (req, res) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req)

        // Create a Message object with escaped and trimmed data.
        const update = {
            text: req.body.text,
            category: req.body.category
        }

        if (!errors.isEmpty()) {
            // There are errors. Return the errors array.
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const updatedMessage = await Message.findByIdAndUpdate(req.params.id, update, { new: true })
            if (!updatedMessage) {
                return res.status(404).json({ error: "Message not found" })
            }
            res.json({ success: true, message: updatedMessage })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
])

router.post('/messages', [
    // Validate and sanitize fields.
    body('text', 'Text must not be empty.').trim().isLength({ min: 7 }),
    body('category', 'Category must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async (req, res) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req)

        // Create a Message object with escaped and trimmed data.
        const message = {
            text: req.body.text,
            category: req.body.category
        }

        if (!errors.isEmpty()) {
            // There are errors. Return the errors array.
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const createdMessage = await Message.create(message)
            res.json({ success: true, message: createdMessage })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
])

// Delete message
router.delete('/messages/:id', async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' })
        }
        res.status(200).json({ message: 'Message deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
});

router.post('/login', (req, res) => {
    const submittedPassword = req.body.password

    console.log("🚀 ~ router.post ~ process.env.PASSWORD:", process.env.PASSWORD)
    if (submittedPassword === process.env.PASSWORD) {
        req.session.isAuthenticated = true;
        res.json({ isAuthenticated: true })
    }
    else {
        res.json({ isAuthenticated: false, message: 'Incorrect Password' })
    }
})

router.get('/check-auth', (req, res) => {
    console.log("🚀 ~ app.get ~ req:", req)
    try {
        if (req.session.isAuthenticated) {
            res.json({ isAuthenticated: true })
        }
        else {
            res.json({ isAuthenticated: false })
        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})

module.exports = router