import { Scraper } from './../../services/scraper';
import { Freefit } from './../../services/freefit';
const config = require('../../config');

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
  const freefit = new Freefit(new Scraper(config.get('freefit.baseUrl')));
  const cities = await freefit.getCities();
  return {
    data: { cities }
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
  const freefit = new Freefit(new Scraper(config.get('freefit.baseUrl')));
  const { city } = request.params;
  const clubs = await freefit.getClubs(city);

  return {
    data: { clubs }
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
