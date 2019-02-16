const config = require('../../config');
import { Scraper } from '../scraper';
import nock from 'nock';
import { clubs } from './fixtures';

describe('Scraper', () => {
  afterAll(() => {
    nock.restore();
  });

  describe('#scrape', () => {
    const baseUrl = config.get('freefit.baseUrl');
    const citiesPath = config.get('freefit.citiesPath');

    const scraper = new Scraper(baseUrl);

    it('fetches data from correct url (baseUrl + path)', async () => {
      const scope = nock(baseUrl)
        .get(citiesPath)
        .reply(200, {});

      await scraper.scrape(citiesPath, ['']);

      expect(scope.isDone()).toBe(true);
    });

    it('scrapes correctly', async () => {
      nock(baseUrl)
        .get(citiesPath)
        .reply(200, clubs);

      const selector = ['option', '#ddlArea'];
      const result = await scraper.scrape(citiesPath, selector);

      // TODO: single contain
      expect(result).toContain('אופקים');
      expect(result).toContain('אזור');
      expect(result).toContain('אילת');
    });
  });
});
