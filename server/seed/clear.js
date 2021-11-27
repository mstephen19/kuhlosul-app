const { Track, Admin } = require('../models');
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
  await Track.deleteMany({});
  await Admin.deleteMany({});
  const confirm = await Track.find({});
  const confirm2 = await Admin.find({});
  console.log('DB cleared!');
  console.log(confirm, confirm2);
  process.exit();
})();
