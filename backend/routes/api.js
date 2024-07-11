const express = require('express')
const router = express.Router()
const Message = require('../models/message')

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


module.exports = router