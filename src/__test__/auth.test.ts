import mongoose from 'mongoose';
import supertest from 'supertest';
import { ethers } from 'ethers';
import { getNonceWithMessage } from '../components/User/userController';
import EnvVars from '../constants/EnvVars';
import app from '../app';
import Paths from '../routes/constants/paths';

const authFullPath = `${Paths.Base}${Paths.Auth.Base}`;
const wallet = ethers.Wallet.createRandom();

describe('AuthRouter', () => {
  beforeAll(async () => {
    await mongoose.connect(EnvVars.db.uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // Test for GET /login
  const loginPath = `${authFullPath}${Paths.Auth.login}`;
  describe(`POST ${loginPath}`, () => {
    it('responds with accessToken', async () => {
      const { message } = await getNonceWithMessage(wallet.address);
      const signature = await wallet.signMessage(message);

      return supertest(app)
        .post(loginPath)
        .send({
          wallet: wallet.address,
          signature,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.data.accessToken).toBeDefined();
        });
    });
  });
});
