import { ClubsDataStore } from './clubs-data-store';
import { Freefit } from './../freefit';
import { ClubsIndexer } from './clubs';
import * as sinon from 'sinon';

describe('index', () => {
  describe('ClubsIndexer', () => {
    it('should index correctly', async () => {
      const stubbedFreefit = sinon.createStubInstance(Freefit);

      stubbedFreefit.getCities.resolves(['אילת', 'גבעתיים']);
      stubbedFreefit.getClubs.withArgs('אילת').resolves(['הולמס פלייס אילת']);
      stubbedFreefit.getClubs
        .withArgs('גבעתיים')
        .resolves(['הולמס פלייס גבעתיים']);

      const stubbedDataStore = sinon.createStubInstance(ClubsDataStore);
      stubbedDataStore.isClubExists.onFirstCall().resolves(true);
      stubbedDataStore.isClubExists.onSecondCall().resolves(false);
      stubbedDataStore.saveClub.resolves();

      const clubsIndexer = new ClubsIndexer(stubbedFreefit, stubbedDataStore);
      await clubsIndexer.index();

      expect(stubbedDataStore.isClubExists.calledTwice).toBe(true);
      expect(stubbedDataStore.saveClub.calledOnce).toBe(true);
    });
  });
});
