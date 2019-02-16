import { IScraper } from './scraper';
const config = require('../config');
import querystring from 'querystring';

export class Freefit {
  constructor(private scraper: IScraper) {}

  public async getCities(): Promise<string[]> {
    const citiesPath = config.get('freefit.citiesPath');
    const selector = ['option', '#ddlArea'];

    const results = await this.scraper.scrape(citiesPath, selector);

    // first result is 'לכל הערים'
    return results.slice(1);
  }

  public async getClubs(city: string): Promise<string[]> {
    const escaped = querystring.escape(city);
    const clubsPath = `#{config.get(freefit.citiesPath)}/?AREA=${escaped})}`;
    const selector = ['#clubList', 'table', 'tr'];

    const scraped = await this.scraper.scrape(clubsPath, selector);
    return scraped;
  }
}
