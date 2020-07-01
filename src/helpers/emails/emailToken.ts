import jwt from 'jsonwebtoken';
import { UserI } from '../../interfaces/user';

const SECRET_KEY = process.env.SECRET_KEY || 'thisIsMySecretKey';

const createToken = (user: UserI) => {
  const payload = {
    id: user._id,
    userName: user.userName,
    firstName: user.firstName,
    email: user.userName,
  };
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '20m',
  });
};

export const generatelink = (link: string, user: UserI) => {
  const token = createToken(user);
  const url = `${link}/${token}`;
  return url;
};
