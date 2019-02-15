import Fastify from 'fastify';
import Swagger from 'fastify-swagger';
import swaggerConfig from './config/swagger';
import logger from './utils/logger';
import errorHandler from './utils/error-handler';
import config from './config';

import { setSharedSchemas } from './web/controllers/common';
import { rootRoutes } from './web/routes';

const app = Fastify({
  logger
});

// Register plugins
if (config.get('env') !== 'test') {
  app.register(Swagger, swaggerConfig);
}

setSharedSchemas(app);
// Handle errors
app.setErrorHandler(errorHandler);

// Register routes
app.register(rootRoutes);

export default app;
