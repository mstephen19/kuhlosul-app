const router = require('express').Router();

module.exports = router;

// const ScScraper = require('./utils/ScScraper');
// const sc = new ScScraper();
// const fs = require('fs');

// const getEmbeds = async (username, alias) => {
//   const tracks = await sc.getAllArtistTracks(username, alias);
//   const tracksInfo = await sc.getTracksInfo(tracks);
//   const tracksEmbeds = await sc.getAllEmbedHtml(tracksInfo);
//   return tracksEmbeds;
// };

// const createFile = async () => {
//   const embeds = await getEmbeds('k_dubs', 'Kuhlosul');
//   const allHtml = embeds.join('\n');
//   fs.writeFile('test.html', allHtml, (err) => err && console.error(err));
// };
