const ScScraper = require('./utils/ScScraper');
const sc = new ScScraper();

const kuhlosul = async () => {
  const track = await sc.getTrackInfo(
    'https://soundcloud.com/k_dubs/myro-who-dem-ft-dread-mc-rider-shafique-kuhlosul-remix'
  );
  const embedHtml = await sc.getEmbedHtml(track);
  console.log(embedHtml);
};

kuhlosul();
