import { Scraper } from './../scraper';
import { Freefit } from '../freefit';
import * as sinon from 'sinon';

describe('Services', () => {
  describe('Freefit', () => {
    describe('#getCities', () => {
      it('should drop the first result', async () => {
        const scraperStub = sinon.createStubInstance(Scraper);
        scraperStub.scrape.resolves(['a', 'b', 'c']);
        const freefit = new Freefit(scraperStub);

        const result = await freefit.getCities();

        expect(result).toHaveLength(2);
      });
    });

    // describe('#getClubs', () => {
    //   it('should return clubs list', async () => {
    //     const scraperStub = sinon.createStubInstance(Scraper);
    //     scraperStub.scrape.resolves(['a', 'b', 'c']);
    //     const freefit = new Freefit(scraperStub);

    //     const result = await freefit.getClubs('');

    //     expect(result).toHaveLength(3);
    //   });
    // });
  });
});
