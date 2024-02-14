import { Request, Response, Router } from 'express';
import HttpStatusCodes from '../constants/HttpStatusCodes';
import Paths from './constants/paths';
import AuthRoutes from '../components/Auth/authRoutes';
import UserRoutes from '../components/User/userRoutes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res
    .status(HttpStatusCodes.OK)
    .json({ message: 'Connection Established' });
});

// routes
router.use(Paths.Auth.Base, AuthRoutes);
router.use(Paths.User.Base, UserRoutes);

export default router;
