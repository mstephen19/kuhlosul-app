const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/mason',
  {
    useNewUrlParser: true,
  },
  function (err, res) {
    try {
      console.log('Connected to MongoDB using Mongoose');
    } catch (err) {
      throw err;
    }
  }
);

module.exports = mongoose.connection;
