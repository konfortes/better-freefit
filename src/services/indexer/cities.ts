import { IFreefitDataStore } from '../freefit-data-store';
import { IFreefit } from './../freefit';

export class CitiesIndexer {
  constructor(
    private freefit: IFreefit,
    private dataStore: IFreefitDataStore
  ) {}

  public async index(): Promise<any> {
    const cities = await this.freefit.getCities();
    return this.dataStore.createCities(cities);
  }
}
