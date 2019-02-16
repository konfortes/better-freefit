export interface IFreefitDataStore {
  isClubExists: (club: string, city: string) => Promise<boolean>;
  saveCity: (city: string) => Promise<any>;
  saveClub: (club: string, city: string) => Promise<any>;
}

export class FreefitDataStore implements IFreefitDataStore {
  public isClubExists(club: string, city: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  public saveCity(city: string): Promise<any> {
    console.log('saving city: ' + city);
    return Promise.resolve();
  }

  public saveClub(club: string, city: string): Promise<any> {
    console.log('saving club: ' + club + 'of city: ' + city);
    return Promise.resolve();
  }
}
