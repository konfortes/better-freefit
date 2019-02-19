import { Club } from './../database/entities/club';
import dbConnection from '../database';

export interface IFreefitDataStore {
  getClubs: (query: any) => Promise<Club[]>;
  createCities: (cities: string[]) => Promise<any>;
  createClubs: (club: Club[]) => Promise<any>;
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

  public async createClubs(clubs: Club[]): Promise<any> {
    const connection = await dbConnection;
    const repo = connection.getRepository(Club);

    return repo.insert(clubs);
  }

  public async createCities(cities: string[]): Promise<any> {
    const connection = await dbConnection;
    return connection
      .createQueryBuilder()
      .insert()
      .into('cities')
      .values(
        cities.map(c => {
          return { name: c };
        })
      )
      .execute();
  }
}
