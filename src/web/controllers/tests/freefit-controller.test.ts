import app from '../../../app';
import HttpCodes from 'http-status-codes';

describe('freefit-controller', () => {
  describe('GET /cities', () => {
    it('should return cities list', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/cities'
      });
      expect(response.statusCode).toBe(HttpCodes.OK);
      const parsed = JSON.parse(response.payload);
      expect(parsed.data.cities).toBeDefined();
    });
  });

  describe('GET /cities/:city/clubs', () => {
    it('should return clubs list', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/cities/אילת/clubs'
      });
      expect(response.statusCode).toBe(HttpCodes.OK);
      const parsed = JSON.parse(response.payload);
      expect(parsed.data.clubs).toBeDefined();
    });
  });

  describe('GET /nearby', () => {
    it('should return 200 OK', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/nearby'
      });
      expect(response.statusCode).toBe(HttpCodes.OK);
    });
  });
});
