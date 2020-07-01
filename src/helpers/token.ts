import { UserI } from '../interfaces/user';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'thisIsMySecretKey';

export const createToken = (user: UserI) => {
  const payload = {
    userName: user.userName,
    firstName: user.firstName,
    email: user.userName,
  };
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: 86400,
  });
};
