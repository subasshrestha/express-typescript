import { NextFunction, Request, Response } from 'express';
import { IUser } from '../User/userSchema';
import { verifyToken } from './authService';
import { errors } from '../../constants/errors';
import { AppError } from '../../helpers/errors';
import HttpStatusCodes from '../../constants/HttpStatusCodes';

export type CustomRequest = Request & {
  user: IUser;
};

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw new AppError(
      HttpStatusCodes.BAD_REQUEST,
      errors.ACCESS_TOKEN_REQUIRED
    );
  }

  const user = verifyToken(req.headers.authorization.replace('Bearer ', ''));
  req.user = user;

  return next();
};
