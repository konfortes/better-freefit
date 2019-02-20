const NodeGeocoder = require('node-geocoder');
const config = require('../../config');
import { Location } from 'database/entities/club';
import logger from '../../utils/logger';

export interface IGeoCoder {
  geocode: (location: string) => Promise<Location>;
  batchGeocode: (locations: string[]) => Promise<Location[]>;
}

const getProvider = (): IGeoCoder => {
  const options = config.get('geocoder');
  return NodeGeocoder(options);
};

export class GeoCoder implements IGeoCoder {
  private provider: any;
  constructor() {
    this.provider = getProvider();
  }

  public geocode(location: string): Promise<Location> {
    return this.provider.geocode(location);
  }

  public async batchGeocode(locations: string[]): Promise<Location[]> {
    const results = await this.provider.batchGeocode(locations);

    return results.map(result => {
      if (result.error != null) {
        logger.error({ error: result.error }, 'error geocoding');
        return null;
      }
      // TODO: handle low confidence results
      return result.value[0];
    });
  }
}
