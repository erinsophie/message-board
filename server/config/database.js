require("dotenv").config();
const mongoose = require("mongoose");

const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DATABASE_URI
    : process.env.DEV_DATABASE_URI;

// connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
