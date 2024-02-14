import EnvVars from '../constants/EnvVars';

export const corsOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  origin: (origin: any, callback: any) => {
    if (EnvVars.app.corsOrigins.indexOf(origin) === -1 || !origin) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
};
