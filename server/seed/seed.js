const { updateDb } = require('../helpers/updateDb');
const { Admin, Track } = require('../models');
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/masondb',
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
    console.log('Updated Tracks!');
    console.log(added);
    const createAdmin = await Admin.create({
      email: 'billybob@gmail.com',
      password: 'Password!123!',
    });
    console.log('Dummy Admin created!');
    console.log(createAdmin);
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
