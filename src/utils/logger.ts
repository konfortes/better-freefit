const packageInfo = require('../../package.json');
import loggerFactory, { Logger } from 'pino';
import config from '../config';

const isDev = config.get('env') !== 'production';

// Default props
const props = {
  name: packageInfo.name,
  version: packageInfo.version
};

// Pino configuration
export const options = {
  prettyPrint: isDev ? { colorize: true, translateTime: true } : false,
  level: config.get('logLevel'),
  base: props
};

// Allow other components to create their own logger
export function createLogger(props: {}): Logger {
  return loggerFactory({
    prettyPrint: options.prettyPrint,
    level: options.level
  }).child(props);
}

// Default logger
export default loggerFactory(options);
