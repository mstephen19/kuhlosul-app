const { updateDb } = require('../helpers/updateDb');
const { Admin, Track, About } = require('../models');
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/masondb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  async function (err, res) {
    try {
      console.log('Connected to MongoDB using Mongoose');
      await seedBase();
    } catch (err) {
      throw err;
    }
  }
);

async function seedBase() {
  try {
    await Admin.deleteMany({});
    await Track.deleteMany({});
    await About.deleteMany({});
    const about = await About.create({
      code: 123,
      header: 'I am Kuhlosul',
      body: 'Hailing from Kelowna B.C. Canada, Kuhlosul is an up-and-coming bass producer who made his musical debut four years ago. Kuhlosul provides his audience with a unique and ghastly take on dubstep, focusing on all things weird and wobbly. Kuhlosul has released music with reputable labels in the past including Emengy, High Caliber Records, and Hybrid Trap. Furthermore, he has garnered support from well-respected artists such as Riot Ten, Minesweepa, Gawm, GlObal, Bassgazm, and more. His persistence and determination have allowed him to perfect his craft and channel his own distinctive sound within his work.',
      showFeatured: true,
      featuredTrack: {
        thumbnailLink:
          'https://media.istockphoto.com/photos/picture-frame-isolated-on-white-picture-id182177931?b=1&k=20&m=182177931&s=170667a&w=0&h=5sBtit9b1_dKsZuyZFLxCX_0j8KuN2ZxpnkGgnbHOt4=',
        title: 'Test Track',
        description: 'Testing the description for the track',
        releaseDate: new Date('December 17, 2022 03:24:00'),
      },
    });
    console.log(about);
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
    process.exit();
  }
}
