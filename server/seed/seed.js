const { updateDb } = require('../helpers/updateDb');
const { Track } = require('../models');
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/mason',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, res) {
    try {
      console.log('Connected to MongoDB using Mongoose');
    } catch (err) {
      throw err;
    }
  }
);

(async function () {
  try {
    const added = await updateDb();
    console.log('Updated!');
    console.log(added)
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
