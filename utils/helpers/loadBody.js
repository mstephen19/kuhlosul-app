const { autoScroll } = require('./autoScroll');
const puppeteer = require('puppeteer');

module.exports = {
  loadBody: async (username, query) => {
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
    return body;
  },
};
