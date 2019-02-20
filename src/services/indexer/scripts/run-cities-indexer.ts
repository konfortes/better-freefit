import { FreefitDataStore } from '../../freefit-data-store';
import { Freefit } from '../../freefit';
import { Scraper } from '../../scraper';
import { CitiesIndexer } from '../cities';
import { createConnection } from '../../../database';
const config = require('../../../config');

(async () => {
  const connection = await createConnection();
  const scraper = new Scraper(config.get('freefit.baseUrl'));
  const freefit = new Freefit(scraper);
  const freefitDataStore = new FreefitDataStore();

  const citiesIndexer = new CitiesIndexer(freefit, freefitDataStore);
  await citiesIndexer.index();
  await connection.close();
})();
