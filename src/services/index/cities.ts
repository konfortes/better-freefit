import { IIndexerDataStore } from './clubs-data-store';
import { IFreefit } from './../freefit';

export class CitiesIndexer {
  constructor(
    private freefit: IFreefit,
    private dataStore: IIndexerDataStore
  ) {}

  public async index() {
    const cities = await this.freefit.getCities();
    for (const city of cities) {
      this.dataStore.saveCity(city);
    }
  }
}
