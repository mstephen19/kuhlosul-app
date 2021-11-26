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
  publishedAt: {
    type: Date,
  },
});

const Track = model('Track', trackSchema);

module.exports = Track;
