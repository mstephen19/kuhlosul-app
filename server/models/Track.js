const { Schema, model } = require('mongoose');

const trackSchema = new Schema({
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  url: {
    type: String,
  },
  genre: {
    type: String,
  },
  html: {
    type: String,
    unique: true,
  },
  publishedAt: {
    type: Date,
  },
});

const Track = model('Track', trackSchema);

module.exports = Track;
