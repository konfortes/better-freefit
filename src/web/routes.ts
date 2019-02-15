import { healthSchema, healthHandler } from './controllers/root-controller';
import {
  citiesSchema,
  citiesHandler,
  clubsSchema,
  clubsHandler,
  nearbySchema,
  nearbyHandler
} from './controllers/freefit-controller';
import { FastifyInstance } from 'fastify';

export const rootRoutes = async (app: FastifyInstance, options: {}) => {
  app.get('/health', { schema: healthSchema }, healthHandler);
};

export const freefitRoutes = async (app: FastifyInstance, options: {}) => {
  app.get('/cities', { schema: citiesSchema }, citiesHandler);
  app.get('/cities/:city/clubs', { schema: clubsSchema }, clubsHandler);
  app.get('/nearby', { schema: nearbySchema }, nearbyHandler);
};
