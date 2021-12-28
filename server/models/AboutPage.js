const { Schema, model } = require('mongoose');

const featuredTrackSchema = new Schema({
  thumbnailLink: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
});

const aboutSchema = new Schema({
  code: {
    type: Number,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  showFeatured: {
    type: Boolean,
    required: true,
  },
  featuredTrack: featuredTrackSchema,
});

const About = model('About', aboutSchema);

module.exports = About;
