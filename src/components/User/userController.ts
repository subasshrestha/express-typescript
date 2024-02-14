import { getSignMessage } from '../../utils/getSignMessage';
import { createUser, getUserByWallet } from './userDAL';

export const getNonceWithMessage = async (wallet: string) => {
  let user = await getUserByWallet(wallet);

  if (!user) {
    user = await createUser(wallet);
  }

  return {
    message: getSignMessage(user.nonce, wallet),
    nonce: user.nonce,
  };
};
