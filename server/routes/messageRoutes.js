const getMessages = require("../controllers/getMessages");
const newMessage = require("../controllers/newMessage");
const express = require("express");
const router = express.Router();

router.get("/messages", getMessages);
router.post("/messages", newMessage);

module.exports = router;
