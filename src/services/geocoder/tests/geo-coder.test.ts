import { GeoCoder } from '..';
import { ProviderFactory } from '../provider-factory';
import * as sinon from 'sinon';
import { geocoderResponse } from './fixtures';

describe('GeoCoder', () => {
  describe('#batchGeocode', () => {
    it('should serialize geocode provider response to Location', async () => {
      const factoryStub = sinon.createStubInstance(ProviderFactory);
      factoryStub.getProvider.returns({
        batchGeocode: () => geocoderResponse
      });
      const geoCoder = new GeoCoder(factoryStub);
      const response = await geoCoder.batchGeocode(['first', 'second']);

      expect(response.length).toBe(2);
      expect(response[0]).toHaveProperty('latitude');
      expect(response[0]).toHaveProperty('longitude');
      expect(response[0]).toHaveProperty('formattedAddress');
    });
  });
});
