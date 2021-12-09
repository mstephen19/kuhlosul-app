const { Schema, model } = require('mongoose');

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
});

const About = model('About', aboutSchema);

module.exports = About;
