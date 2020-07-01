import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
const SECRET_KEY = process.env.SECRET_KEY || 'sdsdasdfsfd';
const router = Router();

router.patch('/reset-password/:token', async (req: Request, res: Response) => {
  const { token } = req.params;
  const user = jwt.verify(token, SECRET_KEY);
  const retult = await UserModel.findOneAndUpdate(
    { userName: user.userName },
    {
      confirmEmail: true,
    }
  );

  res.json({ user });
});

export default router;
