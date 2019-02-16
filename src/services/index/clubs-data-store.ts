export interface IIndexerDataStore {
  isClubExists: (club: string, city: string) => Promise<boolean>;
  saveCity: (city: string) => Promise<any>;
  saveClub: (club: string, city: string) => Promise<any>;
}

export class ClubsDataStore implements IIndexerDataStore {
  public isClubExists(club: string, city: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  public saveCity(city: string): Promise<any> {
    return Promise.resolve();
  }

  public saveClub(club: string, city: string): Promise<any> {
    return Promise.resolve();
  }
}
