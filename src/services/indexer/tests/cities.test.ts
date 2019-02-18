import { CitiesIndexer } from '../cities';
import { FreefitDataStore } from '../../freefit-data-store';
import { Freefit } from '../../freefit';
import * as sinon from 'sinon';

describe('index', () => {
  describe('CitiesIndexer', () => {
    it('should index correctly', async () => {
      const stubbedFreefit = sinon.createStubInstance(Freefit);

      stubbedFreefit.getCities.resolves(['אילת', 'גבעתיים']);

      const stubbedDataStore = sinon.createStubInstance(FreefitDataStore);
      stubbedDataStore.saveClub.resolves();

      const citiesIndexer = new CitiesIndexer(stubbedFreefit, stubbedDataStore);
      await citiesIndexer.index();

      expect(stubbedDataStore.saveCity.calledTwice).toBe(true);
    });
  });
});
