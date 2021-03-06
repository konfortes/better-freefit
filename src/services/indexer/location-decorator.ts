import { Club } from '../../database/entities/club';
import { Location } from '../../database/entities/club';
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
    const clubs = await this.dataStore.getClubs({ status: 'pending' });
    console.log('clubs.length: ' + clubs.length);

    const batchesIterator = this.batches(clubs, this.options.batchSize);

    for (const clubsBatch of batchesIterator) {
      try {
        await this.decorateClubs(clubsBatch);
      } catch (ex) {
        logger.error(ex);
      }
    }
  }

  private *batches(collection, batchSize: number) {
    let index = 0;

    while (index < collection.length) {
      const actualBatch = Math.min(batchSize, collection.length - index);

      yield collection.slice(index, index + actualBatch);
      index += actualBatch;
    }
  }

  private async decorateClubs(clubs: Club[]) {
    // TODO: errors from here won't be caught and club status will stay pending
    const clubLocations = await this.geocoder.batchGeocode(
      clubs.map(c => c.name)
    );

    for (let i = 0; i < clubLocations.length; i++) {
      if (clubLocations[i]) {
        try {
          await this.decorateClub(clubs[i], clubLocations[i]);
        } catch (error) {
          logger.error(
            { error, club: clubs[i].name, location: clubLocations[i] },
            'error decorating club'
          );
        }
      } else {
        logger.warn(`could not find location for ${clubs[i].name}`);
        clubs[i].status = 'error';
        await this.dataStore.saveClub(clubs[i]);
      }
    }
  }

  private async decorateClub(club: Club, location: Location) {
    const { formattedAddress, latitude, longitude } = location;
    club.formattedAddress = formattedAddress || '';
    club.location = { latitude, longitude };
    club.status = 'indexed';

    await this.dataStore.saveClub(club);
  }
}
