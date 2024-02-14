import { Router } from 'express';
import { handleLogin } from './authController';
import { errors } from '../../constants/errors';
import { AppError, catchAsync } from '../../helpers/errors';
import HttpStatusCodes from '../../constants/HttpStatusCodes';
import Paths from '../../routes/constants/paths';

const router = Router();

router.post(
  Paths.Auth.login,
  catchAsync(async (req, res) => {
    const { wallet, signature } = req.body;

    if (!wallet || !signature) {
      throw new AppError(HttpStatusCodes.BAD_REQUEST, errors.MISSING_PARAMS);
    }

    const accessToken = await handleLogin(wallet, signature);

    return res.json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  })
);

export default router;
