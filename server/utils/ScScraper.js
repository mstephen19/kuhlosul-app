const { Client } = require('soundcloud-scraper');
const client = new Client();
const cheerio = require('cheerio');
const { loadProfileBody } = require('./helpers/loadProfileBody');
const axios = require('axios');

class ScScraper {
  constructor() {}

  getUser = async function (username) {
    try {
      const userInfo = await client.getUser(username);
      return userInfo;
    } catch (err) {
      throw new Error('Failed to grab user info.');
    }
  };
  /*
   * @param {username} SoundCloud Username
   * @param {query} 'tracks' or 'reposts' DEFAULT 'tracks'
   * @param {slower} boolean. If true, autoScroll will run slower DEFAULT false
   *
   * @returns ARRAY
   */

  getTracks = async function (username, query = 'tracks', headless) {
    try {
      const body = await loadProfileBody(username, query, headless);

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

  getTracksByPlaylists = async function (username, artistName, headless) {
    try {
      const body = await loadProfileBody(username, 'sets', headless);

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
    try {
      const tracks = await this.getTracks(username);
      const playlistTracks = await this.getTracksByPlaylists(
        username,
        artistName
      );
      return Array.from(new Set([...tracks, ...playlistTracks]));
    } catch (err) {
      throw new Error('Failed to grab all user tracks');
    }
  };

  /*
   * @param {url} SoundCloud track URL
   *
   * @returns OBJECT
   */

  getTrackInfo = async function (url) {
    try {
      const songInfo = await client.getSongInfo(url);
      return songInfo;
    } catch (err) {
      throw new Error('Failed to grab track info');
    }
  };

  /*
   * @param {array} Array of objects returned by one of the getArtistTracks methods
   *
   * @returns ARRAY
   */

  getTracksInfo = async function (array) {
    try {
      const infoArr = [];
      for await (let obj of array) {
        const songInfo = await client.getSongInfo(obj.url);
        infoArr.push(songInfo);
      }
      return infoArr;
    } catch (err) {
      throw new Error('Failed to grab tracks info');
    }
  };

  /*
   * @param {obj} Object returned by the getTrackInfo method
   *
   * @returns STRING
   */

  getEmbedHtml = async function (obj) {
    const { data } = await axios({
      method: 'get',
      url: obj.embedURL,
    });
    return data.html.replace('\\', '');
  };

  /*
   * @param {array} Array of objects returned by the getTracksInfo method
   *
   * @returns ARRAY of embed HTML
   */

  getAllEmbedHtml = async function (array) {
    const embedsArray = [];
    for await (let obj of array) {
      const { data } = await axios({
        method: 'get',
        url: obj.embedURL,
      });
      embedsArray.push(data.html.replace('\\', ''));
    }
    return embedsArray;
  };
}

module.exports = ScScraper;
