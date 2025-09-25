const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  filename: String,
  url: String,
  latitude: Number,
  longitude: Number,
  timestamp: String,
});

module.exports = mongoose.model('Photo', PhotoSchema);
