// scripts/importData.js

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Data = require('../models/Data'); // Adjust the path to match your project structure

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Read the JSON file
    const jsonFilePath = path.resolve(__dirname, '../data/jsondata.json');
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const data = JSON.parse(jsonData);

    // Insert data into MongoDB
    await Data.insertMany(data);
    console.log('Data imported successfully');

    // Exit the process after importing
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
});

db.on('error', (error) => console.error('MongoDB connection error:', error));
