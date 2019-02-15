import { IScraper } from './scraper';
const config = require('../config');

export class Freefit {
  constructor(private scraper: IScraper) {}

  public async getCities(): Promise<string[]> {
    const clubsPath = config.get('freefit.clubsPath');
    const selector = ['option', '#ddlArea'];

    const results = await this.scraper.scrape(clubsPath, selector);

    // first result is 'לכל הערים'
    return results.slice(1);
  }
}
