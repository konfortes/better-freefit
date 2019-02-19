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
    console.log(`decoration with options: ${this.options}`);
    const clubs = await this.dataStore.getClubs({ status: 'pending' });

    // TODO: run in batches with delay
    for (const club of clubs) {
      try {
        const clubLocation = await this.geocoder.geocode(club.name);
        if (!(clubLocation && clubLocation[0])) {
          logger.info(`could not geocode ${club}`);
          continue;
        }
        const { latitude: lat, longitude: lng } = clubLocation[0];
        club.location = { lat, lng };

        this.dataStore.saveClub(club);
        club.location = clubLocation;
      } catch (error) {
        logger.error({ error }, `error geocoding ${club.name}`);
      }
    }

    // const geocoder = new GeoCoder();
  }
}
