const ScScraper = require('../utils/ScScraper');
const sc = new ScScraper();
const { Track } = require('../models');

module.exports = {
  updateDb: async function () {
    try {
      const allTracks = await sc.getAllArtistTracks('k_dubs', 'Kuhlosul');
      const tracksInfo = await sc.getTracksInfo(allTracks);
      const embedLinks = await sc.getAllEmbedHtml(tracksInfo);

      const toInsert = [];
      for await (obj of tracksInfo) {
        const toAdd = {
          title: obj.title,
          thumbnail: obj.thumbnail,
          url: obj.url,
          genre: obj.genre,
          html: embedLinks[tracksInfo.indexOf(obj)],
          publishedAt: obj.publishedAt,
        };

        toInsert.push(toAdd);
        continue;
      }

      const inserted = await Track.insertMany(toInsert);

      return inserted;
    } catch (err) {
      return err;
    }
  },
};
