import { Club } from './../../../database/entities/club';
import { FreefitDataStore } from './../../freefit-data-store';
import { GeoCoder } from './../../geocoder/index';
import { LocationDecorator } from './../location-decorator';
import * as sinon from 'sinon';
import { multipleResults } from './fixtures';

const fakeClub = (id, name, status) => {
  const club = new Club();
  club.id = id;
  club.name = name;
  club.status = status;

  return club;
};

describe('LocationDecorator', () => {
  it('should decorate with location correctly', async () => {
    const freefitDataStore = sinon.createStubInstance(FreefitDataStore);
    const club1 = fakeClub(1, '', '');
    const club2 = fakeClub(2, '', '');
    const club3 = fakeClub(3, '', '');

    freefitDataStore.getClubs.resolves([club1, club2, club3]);

    const geocoder = sinon.createStubInstance(GeoCoder);
    geocoder.batchGeocode.resolves(multipleResults as any);

    const locationDecorator = new LocationDecorator(
      { batchSize: 10, delay: 0 },
      freefitDataStore,
      geocoder
    );
    await locationDecorator.decorate();

    expect(freefitDataStore.saveClub.calledThrice).toBe(true);
  });
});
