import app from '../../../app';
import HttpCodes from 'http-status-codes';

describe('root routes', () => {
  describe('/health', () => {
    it('should return 200 OK', async () => {
      const response = await app.inject({ method: 'GET', url: '/health' });
      expect(response.statusCode).toBe(HttpCodes.OK);
    });
  });
});
