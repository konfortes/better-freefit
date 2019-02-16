import { IFreefitDataStore } from '../freefit-data-store';
import { IFreefit } from './../freefit';

export class CitiesIndexer {
  constructor(
    private freefit: IFreefit,
    private dataStore: IFreefitDataStore
  ) {}

  public async index() {
    const cities = await this.freefit.getCities();
    for (const city of cities) {
      await this.dataStore.saveCity(city);
    }
  }
}
