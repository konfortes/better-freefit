import { Club } from './../../database/entities/club';
import { IFreefit } from './../freefit';
import { IFreefitDataStore } from '../freefit-data-store';
import logger from '../../utils/logger';

export class ClubsIndexer {
  constructor(
    private freefit: IFreefit,
    private dataStore: IFreefitDataStore
  ) {}
  public async index() {
    const cities = await this.freefit.getCities();
    // TODO: parallel
    for (const city of cities) {
      try {
        const clubs = await this.freefit.getClubs(city);
        if (clubs.length) {
          await this.persistClubs(clubs, city);
        }
      } catch (error) {
        logger.error(`error indexing clubs for city ${city}`);
      }
    }
  }

  private async persistClubs(clubs: string[], city: string) {
    const clubEntities: Club[] = [];

    for (const clubName of clubs) {
      const club = new Club();
      club.name = clubName;
      club.city = city;
      clubEntities.push(club);
    }

    await this.dataStore.createClubs(clubEntities);
  }
}
