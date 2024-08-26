require('dotenv').config(); // Load environment variables from .env file

const mongoose = require("mongoose");
require("colors");

// Set `strictQuery` option
mongoose.set('strictQuery', false); // or true, based on your preference

// connectDb Function
const connectDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    console.log(`Connecting to MongoDB using URI: ${mongoUri}`.cyan); // For debugging

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin', // Optionally add this if needed
    });

    console.log(`MongoDB Connected ${conn.connection.host}`.bgYellow);
  } catch (error) {
    console.log(`Error: ${error.message}`.bgRed);
    process.exit(1);
  }
};

// Export
module.exports = connectDb;
