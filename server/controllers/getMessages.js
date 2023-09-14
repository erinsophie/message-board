const Message = require("../model/messageModel");

// query the database for all documents from the messages collection
const getMessages = async (req, res) => {
  try {
    // mongoose automatically converts BSON to JS
    // we get back an array of objects
    const messages = await Message.find();
    // res.json is a combo of setHeader && res.send(JSON.stringify(data))
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getMessages;
