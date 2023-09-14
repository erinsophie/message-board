const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
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
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
