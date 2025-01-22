const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
