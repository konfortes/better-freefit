import { IProviderFactory } from './provider-factory';
import { Location } from 'database/entities/club';
import logger from '../../utils/logger';

export interface IGeoCoder {
  geocode: (location: string) => Promise<Location>;
  batchGeocode: (locations: string[]) => Promise<Location[]>;
}

export class GeoCoder implements IGeoCoder {
  private provider: any;
  constructor(providerFactory: IProviderFactory) {
    this.provider = providerFactory.getProvider();
  }

  public geocode(location: string): Promise<Location> {
    return this.provider.geocode(location);
  }

  public async batchGeocode(locations: string[]): Promise<Location[]> {
    const results = await this.provider.batchGeocode(locations);

    return results.map(result => {
      if (result.error) {
        logger.error({ error: result.error }, 'error geocoding');
        return null;
      }
      // TODO: handle low confidence results
      return result.value[0];
    });
  }
}
