const express = require('express')
const router = express.Router()
const Message = require('../models/message')

// Get all messages
router.get('/messages', async (req, res) => {
    console.log('hiiii')
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

module.exports = router