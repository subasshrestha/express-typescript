import { Router } from 'express';
import { AppError, catchAsync } from '../../helpers/errors';
import { errors } from '../../constants/errors';
import HttpStatusCodes from '../../constants/HttpStatusCodes';
import { getNonceWithMessage } from './userController';
import Paths from '../../routes/constants/paths';

const router = Router();

router.get(
  Paths.User.getNonce,
  catchAsync(async (req, res) => {
    const { wallet = '' } = req.query;

    if (!wallet) {
      throw new AppError(HttpStatusCodes.BAD_REQUEST, errors.MISSING_WALLET);
    }

    const messageWithNonce = await getNonceWithMessage(wallet.toString());

    return res.json({
      status: 'success',
      data: {
        ...messageWithNonce,
      },
    });
  })
);

export default router;
