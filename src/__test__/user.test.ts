import mongoose from 'mongoose';
import supertest from 'supertest';
import { ethers } from 'ethers';
import EnvVars from '../constants/EnvVars';
import app from '../app';
import Paths from '../routes/constants/paths';
import { getSignMessage } from '../utils/getSignMessage';

const userFullPath = `${Paths.Base}${Paths.User.Base}`;
const wallet = ethers.Wallet.createRandom();

describe('UserRouter', () => {
  beforeAll(async () => {
    await mongoose.connect(EnvVars.db.uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // Test for GET /nonce
  const getNonceFullPath = `${userFullPath}${Paths.User.getNonce}`;
  describe(`Get ${getNonceFullPath}`, () => {
    it('responds with nonce and message', () => {
      return supertest(app)
        .get(getNonceFullPath)
        .query({
          wallet: wallet.address,
        })
        .expect(200)
        .then((res) => {
          const { message, nonce } = res.body.data;
          expect(message).toBeDefined();
          expect(nonce).toBeDefined();

          const generatedMessage = getSignMessage(nonce, wallet.address);
          expect(message).toEqual(generatedMessage);
        });
    });
  });
});
