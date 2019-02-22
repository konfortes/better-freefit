const NodeGeocoder = require('node-geocoder');
const config = require('../../config');

export interface IProviderFactory {
  getProvider: () => any;
}

export class ProviderFactory implements IProviderFactory {
  public getProvider() {
    const options = config.get('geocoder');
    return NodeGeocoder(options);
  }
}
