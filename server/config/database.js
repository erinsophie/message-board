require("dotenv").config();
const mongoose = require("mongoose");

// connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@messageappcluster.yqgcukt.mongodb.net/MessagesDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected");
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
