import { Club } from './../../database/entities/club';
import { IFreefit } from './../freefit';
import { IFreefitDataStore } from '../freefit-data-store';

export class ClubsIndexer {
  constructor(
    private freefit: IFreefit,
    private dataStore: IFreefitDataStore
  ) {}
  public async index() {
    const cities = await this.freefit.getCities();
    for (const city of cities) {
      const clubs = await this.freefit.getClubs(city);
      await this.persistClubs(clubs, city);
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
