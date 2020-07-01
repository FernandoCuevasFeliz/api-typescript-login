import { Document } from 'mongoose';

export interface UserI extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  confirmEmail?: boolean;
  isUpdate?: boolean;
  role?: string;
  photo?: string;
  displayName?: string;
  googleId?: string;
  facebookId?: string;
  createdAt?: Date;
  updateAt?: Date;
}
