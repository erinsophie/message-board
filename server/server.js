require('dotenv').config();
const express = require("express");
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./config/database");

// call function that connects to db
connectDB();

// start express server
const app = express();

// define which environment we are in
const CORS_ORIGIN_DEV = process.env.CORS_ORIGIN_DEV || "http://localhost:5173";
const CORS_ORIGIN_PROD = process.env.CORS_ORIGIN_PROD || "https://message-board-erinsophie.netlify.app";
// set the origin based on that
const currentOrigin = process.env.NODE_ENV === 'production' ? CORS_ORIGIN_PROD : CORS_ORIGIN_DEV;

// middlewares
app.use(cors({ origin: currentOrigin }));
// parses JSON into an object before it reaches the controllers so its properties can be accessed
app.use(express.json());

// all routes that start with /api will use the messageRoutes
app.use("/api", messageRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
