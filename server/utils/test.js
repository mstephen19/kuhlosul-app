const ScScraper = require('./ScScraper');
const client = new ScScraper();

const test = async () => {
  const values = await client.getTracks('k_dubs', 'tracks', true);
  const tracksInfo = await client.getTracksInfo(values);
  console.log(tracksInfo);
};

test();
