const ScScraper = require('./utils/ScScraper');
const sc = new ScScraper();

const kuhlosul = async () => {
  const tracks = await sc.getAllArtistTracks('k_dubs', 'Kuhlosul');
  const tracksInfo = await sc.getTracksInfo(tracks);

  console.log(tracksInfo);
};

kuhlosul();
