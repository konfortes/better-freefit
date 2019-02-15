const packageJson = require('../../../package.json');

export const healthSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            version: { type: 'string' }
          }
        }
      }
    },
    500: 'error#'
  }
};

export const healthHandler = async (request, reply) => {
  return {
    data: {
      name: packageJson.name,
      version: packageJson.version
    }
  };
};
