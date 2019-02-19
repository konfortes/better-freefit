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
    geocoder.batchGeocode.resolves([
      {
        latitude: '31.8998823',
        longitude: '35.0166912',
        formattedAddress: "Emek Dotan St 48, Modi'in-Maccabim-Re'ut, Israel"
      }
    ]);

    const locationDecorator = new LocationDecorator(
      { batchSize: 10, delay: 0 },
      freefitDataStore,
      geocoder
    );
    await locationDecorator.decorate();

    expect(freefitDataStore.saveClub.calledOnce).toBe(true);
  });
});
