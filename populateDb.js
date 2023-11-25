#! /usr/bin/env node

console.log(
  'This script populates some messages to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Message = require('./models/message');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch(err => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createMessages();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function messageCreate(category, title, text) {
  const message = new Message({ category, title, text });
  await message.save();
  console.log(
    `Added message: category ${category}, title ${title}, text ${text}`
  );
}

async function createMessages() {
  console.log('Adding messages');
  await Promise.all([
    messageCreate('General', 'Hi', 'Hi how are you?'),
    messageCreate('General2', 'Hi2', 'Hi how are you? 2')
  ]);
}
