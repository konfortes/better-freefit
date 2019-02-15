import { FastifyInstance } from 'fastify';

export const setSharedSchemas = (app: FastifyInstance) => {
  app.addSchema({
    $id: 'error',
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: { code: { type: 'number' }, message: { type: 'string' } }
      }
    }
  });
};
