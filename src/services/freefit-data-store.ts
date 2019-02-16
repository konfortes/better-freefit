import dbConnection from '../database';

export interface IFreefitDataStore {
  isClubExists: (club: string, city: string) => Promise<boolean>;
  saveCity: (city: string) => Promise<any>;
  saveClub: (club: string, city: string) => Promise<any>;
}

export class FreefitDataStore implements IFreefitDataStore {
  public async isClubExists(club: string, city: string): Promise<boolean> {
    const connection = await dbConnection;
    const count = await connection
      .createQueryBuilder()
      .select()
      .from('clubs', 'clubs')
      .where('name = :club AND city = :city', { club, city })
      .getMany();

    return count.length > 0;
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

  public async saveClub(club: string, city: string): Promise<any> {
    const connection = await dbConnection;
    console.log('saving club: ' + club + 'of city: ' + city);
    await connection
      .createQueryBuilder()
      .insert()
      .into('clubs')
      .values({
        name: club,
        city
      })
      .execute();
  }
}
