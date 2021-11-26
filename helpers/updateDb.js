const ScScraper = require('../utils/ScScraper');
const sc = new ScScraper();
const { Track } = require('../models');

module.exports = {
  updateDb: async function () {
    try {
      const allTracks = await sc.getAllArtistTracks('k_dubs', 'Kuhlosul');
      const tracksInfo = await sc.getTracksInfo(allTracks);

      for await (obj of tracksInfo) {
        const toAdd = {
          title: obj.title,
          thumbnail: obj.thumbnail,
          url: obj.url,
          genre: obj.genre,
          publishedAt: obj.publishedAt,
        };

        await Track.create({ ...toAdd });
        continue;
      }

      const inDb = await Track.find({});
      console.log(inDb);
      return inDb;
    } catch (err) {
      console.error(err);
    }
  },
};
