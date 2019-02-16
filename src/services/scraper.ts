import axios from 'axios';
import cheerio from 'cheerio';

export interface IScraper {
  scrape: (path: string, selector: string | string[]) => Promise<string[]>;
}

export class Scraper {
  constructor(private baseUrl: string) {}

  public async scrape(
    path: string,
    selector: string | string[]
  ): Promise<string[]> {
    const rawHtml = await this.getRawHtml(this.baseUrl + path);
    return this.doScrape(rawHtml, selector);
  }

  private async getRawHtml(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }

  // returns the element text
  private doScrape(html: string, selector: string | string[]): string[] {
    const $ = cheerio.load(html);

    const result: string[] = [];
    const items = Array.isArray(selector) ? $(...selector) : $(selector);
    items.map((i, elm) => {
      result.push(elm.lastChild.data);
    });

    return result;
  }
}
