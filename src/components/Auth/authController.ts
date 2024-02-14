import { ethers } from 'ethers';
import { getSignMessage } from '../../utils/getSignMessage';
import { errors } from '../../constants/errors';
import HttpStatusCodes from '../../constants/HttpStatusCodes';
import { AppError } from '../../helpers/errors';
import { getUserByWallet, updateUserNonce } from '../User/userDAL';
import { generateToken } from './authService';

export const handleLogin = async (wallet: string, signature: string) => {
  const user = await getUserByWallet(wallet);

  if (!user) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, errors.USER_NOT_FOUND);
  }

  const message = getSignMessage(user.nonce, wallet);
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);

  if (recoveredAddress.toLowerCase() !== wallet.toLowerCase()) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, errors.INVALID_SIGNATURE);
  }

  await updateUserNonce(wallet, Date.now());

  const accessToken = generateToken(user);

  return accessToken;
};
