const SoundCloud = require('soundcloud-scraper');
const client = new SoundCloud.Client();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { autoScroll } = require('./autoScroll');

module.exports = {
  /*
   * @param {username} SoundCloud Username
   * @param {query} 'tracks' or 'reposts' DEFAULT 'tracks'
   * @param {slower} boolean. If true, autoScroll will run slower DEFAULT false
   */

  getTracks: async (username, query = 'tracks') => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://soundcloud.com/${username}/${query}`);
      await page.setViewport({
        width: 1200,
        height: 800,
      });
      await page.waitForSelector('#content', { timeout: 1500 });

      await autoScroll(page);

      const body = await page.evaluate(() => {
        return document.querySelector('body').innerHTML;
      });

      await browser.close();

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
  },

  /*
   * @param {username} SoundCloud Username
   * @param {artistName} The name the artist goes by, searching all of their playlists for tracks including their name
   */
  getTracksByPlaylists: async (username, artistName) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://soundcloud.com/${username}/sets`);
      await page.setViewport({
        width: 1200,
        height: 800,
      });
      await page.waitForSelector('#content', { timeout: 1500 });

      await autoScroll(page);

      const body = await page.evaluate(() => {
        return document.querySelector('body').innerHTML;
      });

      await browser.close();

      const $ = cheerio.load(body);

      const tracks = [];

      $('.sound__body').each((_i, elem) => {
        const ul = $(elem).find('.compactTrackListItem__trackTitle');
        $(ul).map((i, li) => {
          const trackName = $(li).text().trim();

          if (trackName.toLowerCase().includes(artistName.toLowerCase())) {
            tracks.push({
              name: $(li).text().trim(),
              link:
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
  },
};
