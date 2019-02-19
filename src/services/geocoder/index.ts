const NodeGeocoder = require('node-geocoder');
const config = require('../../config');
import { Location } from 'database/entities/club';

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

  public batchGeocode(locations: string[]): Promise<Location[]> {
    // TODO: flatten the inner arrays
    return this.provider.batchGeocode(locations);
  }
}
