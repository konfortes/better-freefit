import { GeoCoder } from './../../geocoder/index';
import { FreefitDataStore } from './../../freefit-data-store';
import { LocationDecorator } from './../location-decorator';
const config = require('../../../config');

(async () => {
  const freefitDataStore = new FreefitDataStore();
  const geocoder = new GeoCoder();

  const locationDecorator = new LocationDecorator(
    config.get('locationDecorator'),
    freefitDataStore,
    geocoder
  );

  await locationDecorator.decorate();
})();