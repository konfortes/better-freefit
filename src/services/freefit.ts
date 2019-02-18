import { IScraper } from './scraper';
const config = require('../config');
import querystring from 'querystring';

export interface IFreefit {
  getCities: () => Promise<string[]>;
  getClubs: (city: string) => Promise<string[]>;
}

export class Freefit implements IFreefit {
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
    const clubsPath = `${config.get('freefit.citiesPath')}/?AREA=${escaped}`;
    const selector = '#clubList table tr>td:nth-child(3)';

    const results = await this.scraper.scrape(clubsPath, selector);
    // first result is th
    return results.slice(1);
  }
}
