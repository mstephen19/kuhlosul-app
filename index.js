const SoundCloud = require('./utils/SoundCloudScraper');

const test = async () => {
  const res = await SoundCloud.getTracksByPlaylists('k_dubs');
  console.log(res);
};

test();
