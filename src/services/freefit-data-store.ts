import { getConnection, Connection } from 'typeorm';
import { Club } from '../database/entities/club';

export interface IFreefitDataStore {
  getClubs: (query: any) => Promise<Club[]>;
  createCities: (cities: string[]) => Promise<any>;
  createClubs: (club: Club[]) => Promise<any>;
}

export class FreefitDataStore implements IFreefitDataStore {
  // TODO: change connection to private. it is public because:
  /* argument of type 'SinonStubbedInstance<FreefitDataStore>' is not assignable to parameter of type 'FreefitDataStore'.
  Property 'connection' is missing in type 'SinonStubbedInstance<FreefitDataStore>' but required in type 'FreefitDataStore'. */
  public connection: Connection;

  constructor() {
    this.connection = getConnection();
  }

  public async getClubs(query: any = {}): Promise<Club[]> {
    const repo = this.connection.getRepository(Club);

    return repo.find(query);
  }

  public async getCities(): Promise<any> {
    const results = await this.connection
      .createQueryBuilder()
      .select('name')
      .from('cities', 'cities')
      .execute();

    return results.map(r => r.name);
  }

  public async saveClub(club: Club): Promise<any> {
    const repo = this.connection.getRepository(Club);

    await repo.save(club);
  }

  public async createClubs(clubs: Club[]): Promise<any> {
    const repo = this.connection.getRepository(Club);

    return repo.insert(clubs);
  }

  public async createCities(cities: string[]): Promise<any> {
    return this.connection
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
