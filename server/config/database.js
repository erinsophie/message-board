require("dotenv").config();
const mongoose = require("mongoose");

const connectionStr = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@messageappcluster.yqgcukt.mongodb.net/MessagesDatabase?retryWrites=true&w=majority`;

// connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
