const SoundCloud = require('soundcloud-scraper');
const client = new SoundCloud.Client();
const cheerio = require('cheerio');
const { loadBody } = require('./helpers/loadBody');

class ScScraper {
  constructor() {}

  /*
   * @param {username} SoundCloud Username
   * @param {query} 'tracks' or 'reposts' DEFAULT 'tracks'
   * @param {slower} boolean. If true, autoScroll will run slower DEFAULT false
   *
   * @returns ARRAY
   */

  getTracks = async function (username, query = 'tracks') {
    try {
      const body = await loadBody(username, query);

      const $ = cheerio.load(body);

      const tracks = [];

      $('.sound__body').each((_i, elem) => {
        const sound = {
          title: $(elem).find('.soundTitle__title > span').text().trim(),
          url:
            'https://soundcloud.com' +
            $(elem).find('.soundTitle__title').attr('href'),
        };
        tracks.push(sound);
      });
      return tracks;
    } catch (err) {
      throw new Error('Failed to pull tracks.');
    }
  };

  /*
   * @param {username} SoundCloud Username
   * @param {artistName} The name the artist goes by, searching all of their playlists for tracks including their name
   *
   * @returns ARRAY
   */

  getTracksByPlaylists = async function (username, artistName) {
    try {
      const body = await loadBody(username, 'sets');

      const $ = cheerio.load(body);

      const tracks = [];

      $('.sound__body').each((_i, elem) => {
        const ul = $(elem).find('.compactTrackListItem__trackTitle');
        $(ul).map((i, li) => {
          const trackName = $(li).text().trim();

          if (trackName.toLowerCase().includes(artistName.toLowerCase())) {
            tracks.push({
              name: $(li).text().trim(),
              url:
                'https://soundcloud.com' +
                $(li).attr('data-permalink-path').split('?in=')[0],
            });
          }
        });
      });
      return tracks;
    } catch (err) {
      throw new Error('Failed to pull tracks.');
    }
  };

  /*
   * @param {username} SoundCloud Username
   * @param {artistName} The name the artist goes by, searching all of their playlists for tracks including their name
   *
   * @returns ARRAY
   */

  getAllArtistTracks = async function (username, artistName) {
    const tracks = await this.getTracks(username);
    const playlistTracks = await this.getTracksByPlaylists(
      username,
      artistName
    );
    return Array.from(new Set([...tracks, ...playlistTracks]));
  };

  /*
   * @param {url} SoundCloud track URL
   *
   * @returns OBJECT
   */

  getTrackInfo = async function (url) {
    const songInfo = await client.getSongInfo(url);
    return songInfo;
  };

  /*
   * @param {array} Array of objects returned by one of the getArtistTracks functions
   *
   * @returns ARRAY
   */

  getTracksInfo = async function (array) {
    const infoArr = [];
    for await (let obj of array) {
      const songInfo = await client.getSongInfo(obj.url);
      infoArr.push(songInfo);
    }
    return infoArr;
  };
}

module.exports = ScScraper;
