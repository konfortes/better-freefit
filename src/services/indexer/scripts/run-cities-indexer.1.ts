import { FreefitDataStore } from '../../freefit-data-store';
import { Freefit } from '../../freefit';
import { Scraper } from '../../scraper';
import { CitiesIndexer } from '../cities';
const config = require('../../config');

(async () => {
  const scraper = new Scraper(config.get('freefit.baseUrl'));
  const freefit = new Freefit(scraper);
  const freefitDataStore = new FreefitDataStore();

  const citiesIndexer = new CitiesIndexer(freefit, freefitDataStore);
  await citiesIndexer.index();
})();
