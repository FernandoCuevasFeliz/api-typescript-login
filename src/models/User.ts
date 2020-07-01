import { Schema, model, SchemaOptions } from 'mongoose';
import { UserI } from '../interfaces/user';

const options: SchemaOptions = {
  timestamps: true,
  toJSON: {
    transform: function (doc, obj) {
      delete obj.googleId;
      delete obj.facebookId;
      delete obj.password;
      delete obj.confirmPassword;
      delete obj.__v;
      return obj;
    },
  },
};
const UserSchema: Schema = new Schema(
  {
    googleId: {
      type: String,
      unique: true,
    },
    facebookId: {
      type: String,
      unique: true,
    },

    displayName: {
      type: String,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },

    photo: {
      type: String,
    },

    password: {
      type: String,
    },

    confirmPassword: {
      type: String,
    },

    role: {
      type: String,
      default: 'user',
    },

    confirmEmail: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
  options
);

export default model<UserI>('user', UserSchema);
