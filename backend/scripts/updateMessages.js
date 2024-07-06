require('dotenv').config();
const { MongoClient } = require('mongodb');

async function updateMessages() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to database');

        const database = client.db();
        const collection = database.collection('messages');

        const updateResult = await collection.updateMany(
            {},
            { $set: { isArchived: false } }
        );

        console.log(`Matched ${updateResult.matchedCount} documents and modified ${updateResult.modifiedCount} documents`);
    } catch (error) {
        console.error('Error updating documents:', error);
    } finally {
        await client.close();
    }
}

updateMessages();
