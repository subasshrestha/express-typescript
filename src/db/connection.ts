import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from '../helpers/logger';
import EnvVars from '../constants/EnvVars';

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(EnvVars.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error(`DBError: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
