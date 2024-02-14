import http from 'http';
import app from './app';
import EnvVars from './constants/EnvVars';
import { logger } from './helpers/logger';

const server = http.createServer(app);

server.listen(EnvVars.app.port, () => {
  logger.info(`Server is listening on port ${EnvVars.app.port}`);
});
