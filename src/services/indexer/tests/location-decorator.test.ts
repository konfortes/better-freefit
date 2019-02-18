import { Club } from './../../../database/entities/club';
import { FreefitDataStore } from './../../freefit-data-store';
import { GeoCoder } from './../../geocoder/index';
import { LocationDecorator } from './../location-decorator';
import * as sinon from 'sinon';

describe('LocationDecorator', () => {
  it('should decorate with location correctly', async () => {
    const freefitDataStore = sinon.createStubInstance(FreefitDataStore);
    const club = new Club();
    club.id = 1;
    club.name = 'הולמס פלייס מודיעין';
    club.status = 'pending';
    freefitDataStore.getClubs.resolves([club]);

    const geocoder = sinon.createStubInstance(GeoCoder);
    geocoder.geocode.resolves({ lat: 32.32, lng: 33.33 });

    const locationDecorator = new LocationDecorator(
      { batchSize: 10, delay: 0 },
      freefitDataStore,
      geocoder
    );
    await locationDecorator.decorate();

    expect(freefitDataStore.saveClub.calledOnce).toBe(true);
  });
});
