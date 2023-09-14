const express = require("express");
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./config/database");

// call function that connects to db
connectDB();

// start express server
const app = express();

// middlewares
app.use(cors({ origin: "http://localhost:5173" }));
// parses JSON into an object before it reaches the controllers so its properties can be accessed
app.use(express.json());

// all routes that start with /api will use the messageRoutes
app.use("/api", messageRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
