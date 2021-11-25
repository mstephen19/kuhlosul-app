const SoundCloud = require('./utils/SoundCloudScraper');

const allKuhlosulTracks = async () => {
  const tracks = await SoundCloud.getTracks('k_dubs');
  const playlistTracks = await SoundCloud.getTracksByPlaylists(
    'k_dubs',
    'Kuhlosul'
  );
  return Array.from(new Set([...tracks, ...playlistTracks]));
};

allKuhlosulTracks().then((res) => {
  console.log(res);
  console.log(res.length);
});
