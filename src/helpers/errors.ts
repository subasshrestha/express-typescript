import { NextFunction, Request, RequestHandler, Response } from 'express';
import HttpStatusCodes from '../constants/HttpStatusCodes';

export class AppError extends Error {
  public readonly status: HttpStatusCodes;

  constructor(status: HttpStatusCodes, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.status = status;

    Error.captureStackTrace(this);
  }
}

export function catchAsync(handler: RequestHandler): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      return Promise.resolve(handler(req, res, next)).catch(next);
    } catch (error) {
      return next(error);
    }
  };
}
