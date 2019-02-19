import { IGeoCoder } from './../geocoder/index';
import { FreefitDataStore } from './../freefit-data-store';
import logger from '../../utils/logger';

interface ILocationDecoratorOptions {
  batchSize: number;
  delay: number;
}

export class LocationDecorator {
  constructor(
    private options: ILocationDecoratorOptions,
    private dataStore: FreefitDataStore,
    private geocoder: IGeoCoder
  ) {}
  public async decorate() {
    // TODO: run in batches
    console.log(`decoration with options: ${this.options}`);
    const clubs = await this.dataStore.getClubs({ status: 'pending' });

    // TODO: batchGeocode returns an array of arrays, wheres geocode returns just an array (multiple geocode results for the same location)
    for (const club of clubs) {
      try {
        const clubLocation = await this.geocoder.geocode(club.name);
        if (!(clubLocation && clubLocation[0])) {
          logger.warn(`could not geocode ${club}`);
          club.status = 'error';
          continue;
        }
        const { formattedAddress, latitude, longitude } = clubLocation[0];

        club.formattedAddress = formattedAddress;
        club.location = { latitude, longitude };
        club.status = 'indexed';
      } catch (error) {
        logger.error({ error }, `error geocoding ${club.name}`);
        club.status = 'error';
      } finally {
        await this.dataStore.saveClub(club);
      }
    }
  }
}
