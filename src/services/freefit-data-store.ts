import { getConnection } from 'typeorm';
import { Club } from '../database/entities/club';

export interface IFreefitDataStore {
  getClubs: (query: any) => Promise<Club[]>;
  createCities: (cities: string[]) => Promise<any>;
  createClubs: (club: Club[]) => Promise<any>;
}

export class FreefitDataStore implements IFreefitDataStore {
  public async getClubs(query: any = {}): Promise<Club[]> {
    const connection = await getConnection();
    const repo = connection.getRepository(Club);

    return repo.find(query);
  }

  public async saveClub(club: Club): Promise<any> {
    const connection = await getConnection();
    const repo = connection.getRepository(Club);

    await repo.save(club);
  }

  public async createClubs(clubs: Club[]): Promise<any> {
    const connection = await getConnection();
    const repo = connection.getRepository(Club);

    return repo.insert(clubs);
  }

  public async createCities(cities: string[]): Promise<any> {
    const connection = await getConnection();
    return connection
      .createQueryBuilder()
      .insert()
      .into('cities', ['name'])
      .values(
        cities.map(c => {
          return { name: c };
        })
      )
      .execute();
  }
}
