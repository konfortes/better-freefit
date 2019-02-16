import axios from 'axios';
import cheerio from 'cheerio';

export interface IScraper {
  scrape: (path: string, selector: string[]) => Promise<string[]>;
}

export class Scraper {
  constructor(private baseUrl: string) {}

  public async scrape(path: string, selector: string[]): Promise<string[]> {
    const rawHtml = await this.getRawHtml(this.baseUrl + path);
    return this.doScrape(rawHtml, selector);
  }

  private async getRawHtml(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }

  // returns the element text
  private doScrape(html: string, selector: string[]): string[] {
    const $ = cheerio.load(html);

    const result: Array<string> = [];
    console.log('-------------------');
    // console.log(html);
    // TODO: this way works for cities, doesn not work for clubs
    // const items = $(...selector);
    const items = $(selector.join(' '));
    console.log('items: ' + items);
    console.log('-------------------');
    items.map((i, elm) => {
      result.push(elm.lastChild.data);
    });

    return result;
  }
}
