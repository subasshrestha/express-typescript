import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsOptions } from './helpers/cors';
import EnvVars from './constants/EnvVars';
import NodeEnvs from './constants/misc';
import { logger } from './helpers/logger';
import HttpStatusCodes from './constants/HttpStatusCodes';
import { AppError } from './helpers/errors';
import Paths from './routes/constants/paths';
import router from './routes';
import connectDB from './db/connection';

const app = express();

// Connect to database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths.Base, router);

// Catch 404 and forward to error handler
app.use((_: Request, _res: Response, next: NextFunction) => {
  const err = new AppError(HttpStatusCodes.NOT_FOUND, 'Not Found');
  return next(err);
});

// Add error handler
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: Error, _: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError && !['SyntaxError'].includes(err.name)) {
    return res.status(err.status).json({ status: 'error', error: err.message });
  }

  // Unexpected error
  logger.log({
    level: 'error',
    message: err.stack ?? err.message,
  });
  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ status: 'error', error: 'Something went wrong' });
});

export default app;
