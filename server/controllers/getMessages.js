const Message = require("../models/MessageModel");

// query the database for all documents from the messages collection
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getMessages;
