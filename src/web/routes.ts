import { healthSchema, healthHandler } from './controllers/root-controller';
import { FastifyInstance } from 'fastify';
import { authenticationError } from '../utils/errors-factory';

export const rootRoutes = async (app: FastifyInstance, options: {}) => {
  app.get('/health', { schema: healthSchema }, healthHandler);

  // Example of route that throws an error, can be removed
  app.get('/error', async (request, reply) => {
    throw authenticationError();
  });
};
