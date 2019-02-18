import { Club } from './../database/entities/club';
import dbConnection from '../database';

export interface IFreefitDataStore {
  // isClubExists: (club: string, city: string) => Promise<boolean>;
  getClubs: (query: any) => Promise<Club[]>;
  saveCity: (city: string) => Promise<any>;
  saveClub: (club: Club) => Promise<any>;
}

export class FreefitDataStore implements IFreefitDataStore {
  public async getClubs(query: any = {}): Promise<Club[]> {
    const connection = await dbConnection;
    const repo = connection.getRepository(Club);

    return repo.find(query);
  }

  public async saveClub(club: Club): Promise<any> {
    const connection = await dbConnection;
    const repo = connection.getRepository(Club);

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
