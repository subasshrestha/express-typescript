import jwt from 'jsonwebtoken';
import { errors } from '../../constants/errors';
import { AppError } from '../../helpers/errors';
import { IUser } from '../User/userSchema';
import EnvVars from '../../constants/EnvVars';
import HttpStatusCodes from '../../constants/HttpStatusCodes';

export const generateToken = (user: IUser) => {
  const token = jwt.sign(
    {
      wallet: user.wallet,
      role: user.role,
      nonce: user.nonce,
    },
    EnvVars.jwt.secret,
    {
      expiresIn: EnvVars.jwt.expiresIn,
    }
  );
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, EnvVars.jwt.secret);
    return decoded as IUser;
  } catch (_err) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      errors.INVALID_ACCESS_TOKEN
    );
  }
};
