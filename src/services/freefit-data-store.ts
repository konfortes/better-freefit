import { Club, Location } from './../database/entities/club';
import dbConnection from '../database';

export interface IFreefitDataStore {
  // isClubExists: (club: string, city: string) => Promise<boolean>;
  getClubs: (query: any) => Promise<Club[]>;
  saveCity: (city: string) => Promise<any>;
  saveClub: (club: string, city: string) => Promise<any>;
}

export class FreefitDataStore implements IFreefitDataStore {
  public async getClubs(query: any = {}): Promise<Club[]> {
    const connection = await dbConnection;
    const repo = connection.getRepository(Club);

    return repo.find(query);
  }

  public async saveClub(
    clubName: string,
    city: string,
    status?: string,
    location?: Location
  ): Promise<any> {
    const connection = await dbConnection;
    const repo = connection.getRepository(Club);

    const club = new Club();
    club.name = clubName;
    club.city = city;
    club.status = status || 'pending';
    club.location = location;

    await repo.save(club);
  }

  public async saveCity(city: string): Promise<any> {
    const connection = await dbConnection;
    console.log('saving city: ' + city);
    await connection
      .createQueryBuilder()
      .insert()
      .into('cities')
      .values({
        name: city
      })
      .execute();
  }
}
