export const citiesSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            cities: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    500: 'error#'
  }
};

export const citiesHandler = async (request, reply) => {
  return {
    data: {}
  };
};

export const clubsSchema = {
  params: {
    city: { type: 'string' }
  },
  required: ['city'],
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            clubs: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    500: 'error#'
  }
};

export const clubsHandler = async (request, reply) => {
  return {
    data: {}
  };
};

export const nearbySchema = {
  querystring: {
    lat: { type: 'string' },
    lng: { type: 'string' },
    radius: { type: 'number' }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              location: {
                type: 'object',
                properties: {
                  lat: { type: 'string' },
                  lng: { type: 'string' }
                }
              }
            }
          }
        }
      }
    },
    500: 'error#'
  }
};

export const nearbyHandler = async (request, reply) => {
  return {
    data: {}
  };
};
