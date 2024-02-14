import { UserModel } from './userSchema';

export const getUserByWallet = async (wallet: string) => {
  const user = await UserModel.findOne({ wallet });
  return user;
};

export const createUser = async (wallet: string) => {
  const user = await UserModel.create({ wallet });
  return user;
};

export const updateUserNonce = async (wallet: string, nonce: number) => {
  const user = await UserModel.findOneAndUpdate(
    { wallet },
    { nonce },
    { new: true }
  );
  return user;
};
