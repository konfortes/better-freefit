import { FreefitDataStore } from '../../freefit-data-store';
import { Freefit } from '../../freefit';
import { ClubsIndexer } from '../clubs';
import * as sinon from 'sinon';

describe('index', () => {
  describe('ClubsIndexer', () => {
    it('should index correctly', async () => {
      const freefit = sinon.createStubInstance(Freefit);

      freefit.getCities.resolves(['אילת', 'גבעתיים']);
      freefit.getClubs.withArgs('אילת').resolves(['הולמס פלייס אילת']);
      freefit.getClubs.withArgs('גבעתיים').resolves(['הולמס פלייס גבעתיים']);

      const dataStore = sinon.createStubInstance(FreefitDataStore);
      dataStore.saveClub.resolves();

      const clubsIndexer = new ClubsIndexer(freefit, dataStore);
      await clubsIndexer.index();

      expect(dataStore.createClubs.calledTwice).toBe(true);
    });
  });
});
