import { ClubsIndexer } from '../clubs';
import { FreefitDataStore } from '../../freefit-data-store';
import { Freefit } from '../../freefit';
import { Scraper } from '../../scraper';
const config = require('../../config');

(async () => {
  const scraper = new Scraper(config.get('freefit.baseUrl'));
  const freefit = new Freefit(scraper);
  const freefitDataStore = new FreefitDataStore();

  const clubsIndexer = new ClubsIndexer(freefit, freefitDataStore);
  await clubsIndexer.index();
})();
