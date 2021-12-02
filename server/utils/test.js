const ScScraper = require('./ScScraper');
const client = new ScScraper();

const test = async () => {
  const values = await client.getTracks('k_dubs', 'tracks', false)
  console.log(values)
};

test()
