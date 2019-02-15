const config = require('../../config');
import { Scraper } from '../scraper';
import nock from 'nock';
import { clubs } from './fixtures';

describe('Scraper', () => {
  describe('#scrape', () => {
    const baseUrl = config.get('freefit.baseUrl');
    const clubsPath = config.get('freefit.clubsPath');

    const scraper = new Scraper(baseUrl);

    it('fetches data from correct url (baseUrl + path)', async () => {
      const scope = nock(baseUrl)
        .get(clubsPath)
        .reply(200, {});

      await scraper.scrape(clubsPath, ['']);

      expect(scope.isDone()).toBe(true);
    });

    it('scrapes correctly', async () => {
      nock(baseUrl)
        .get(clubsPath)
        .reply(200, clubs);

      const selector = ['option', '#ddlArea'];
      const result = await scraper.scrape(clubsPath, selector);

      // TODO: single contain
      expect(result).toContain('אופקים');
      expect(result).toContain('אזור');
      expect(result).toContain('אילת');
    });
  });
});
