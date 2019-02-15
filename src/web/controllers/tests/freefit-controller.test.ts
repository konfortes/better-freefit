import app from '../../../app';
import HttpCodes from 'http-status-codes';

describe('freefit-controller', () => {
  describe('GET /cities', () => {
    it('should return 200 OK', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/cities'
      });
      expect(response.statusCode).toBe(HttpCodes.OK);
    });
  });

  describe('GET /cities/:city/clubs', () => {
    it('should return 200 OK', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/cities/tel-aviv/clubs'
      });
      expect(response.statusCode).toBe(HttpCodes.OK);
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
