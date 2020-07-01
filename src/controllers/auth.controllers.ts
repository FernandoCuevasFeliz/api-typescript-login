import { Request, Response, NextFunction } from 'express';
import { createToken } from '../helpers/token';
import { encryptPassword, matchPassword } from '../helpers/bcrypt';
import { validationResult, check } from 'express-validator';
import UserModel from '../models/User';
import passport from 'passport';
import { UserI } from '../interfaces/user';

import sendEmail, { typeMessage } from '../helpers/nodemailer';

// Local
export const signInCtl = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
    } = req.body;

    const verifyEmail = await UserModel.findOne({ email: email });
    const verifyUserName = await UserModel.findOne({ userName: userName });

    if (verifyEmail || verifyUserName) {
      return res.status(400).json({
        error: 'Username or Email not Available',
      });
    }

    // verify if password and confirmPassword match
    if (!(password === confirmPassword)) {
      return res.status(400).json({
        error: 'Passwords is not match',
      });
    }

    // create formated user object
    const user = {
      firstName: firstName.toLowerCase().trim(),
      lastName: lastName.toLowerCase().trim(),
      userName: userName.toLowerCase().trim(),
      displayName: `${firstName
        .toLowerCase()
        .trim()} ${lastName.toLowerCase().trim()}`,
      email: email.toLowerCase().trim(),
      password: await encryptPassword(password),
      confirmPassword: await encryptPassword(confirmPassword),
    };

    try {
      const link = `${process.env.URL_CLIENT}/reset-password`;
      const message = typeMessage('confirmAccount', user, link);
      await sendEmail(message);
    } catch (err) {
      return res.status(422).json({ msg: 'Login Error', error: err });
    }
    const newUser = await UserModel.create(user);

    const dataUser = {
      firstname: newUser.firstName,
      lastname: newUser.lastName,
      displayName: newUser.displayName,
      username: newUser.userName,
      email: newUser.email,
      image: newUser.photo,
      token: createToken(newUser),
    };

    return res.status(201).json({ status: 'success', dataUser });
  }

  return res.status(422).json({ msg: 'Request error', errors });
};

export const signUpCtl = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { username, password } = req.body;

    // Verify if username is email or userName
    let user;

    if (check(username.trim()).isEmail()) {
      user = await UserModel.findOne({
        email: username.toLowerCase().trim(),
      });
    }

    if (user === null) {
      user = await UserModel.findOne({
        userName: username.toLowerCase().trim(),
      });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify if Passwords Match
    if (user.password === undefined || user.confirmPassword === undefined) {
      return res.status(404).json({ error: 'Incorrect Password' });
    }

    const isPasswordCorrect = await matchPassword(password, user.password);
    const isPasswordConfirmCorrect = await matchPassword(
      password,
      user.confirmPassword
    );

    if (!isPasswordCorrect && !isPasswordConfirmCorrect) {
      return res.status(404).json({ error: 'Incorrect Password' });
    }

    const dataUser = {
      firstname: user.firstName,
      lastname: user.lastName,
      displayName: user.displayName,
      username: user.userName,
      email: user.email,
      image: user.photo,
      token: createToken(user),
    };
    return res.status(201).json({ status: 'success', dataUser });
  }
  return res.status(422).json({ msg: 'Request error', errors });
};

// Google

export const googleAuthCtl = (req: Request, res: Response) => {
  passport.authenticate('google', { scope: ['openid', 'profile', 'email'] })(
    req,
    res
  );
};

export const googleCallbackCtl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('google', async (err, user: UserI) => {
    if (err) {
      return res.status(400).json({ error: 'Login Error' });
    }
    if (user) {
      req.user = user;
      next();
    }
  })(req, res, next);
};

export const googleCtl = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (req.user === undefined) {
    return res.status(400).json({ error: 'Login Error' });
  }
  const userReq: UserI = req.user;
  const user = await UserModel.findOne({ googleId: userReq.googleId });
  if (user === null) {
    return res.status(400).json({ error: 'Login Error' });
  }
  const dataUser = {
    firstname: user.firstName,
    lastname: user.lastName,
    displayName: user.displayName,
    username: user.userName,
    email: user.email,
    image: user.photo,
    token: createToken(user),
  };
  return res.status(200).json({ dataUser });
};

// Facebook

export const FacebookAuthCtl = (req: Request, res: Response) => {
  passport.authenticate('facebook')(req, res);
};

export const FacebookCallbackCtl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('facebook', async (err, user: UserI) => {
    if (err) {
      return res.status(400).json({ error: 'Login Error' });
    }
    if (user) {
      req.user = user;
      next();
    }
  })(req, res, next);
};

export const FacebookCtl = async (req: Request, res: Response) => {
  if (req.user === undefined) {
    return res.status(400).json({ error: 'Login Error' });
  }
  const userReq: UserI = req.user;
  const user = await UserModel.findOne({ facebookId: userReq.facebookId });
  if (user === null) {
    return res.status(400).json({ error: 'Login Error' });
  }
  const dataUser = {
    firstname: user.firstName,
    lastname: user.lastName,
    displayName: user.displayName,
    username: user.userName,
    email: user.email,
    image: user.photo,
    token: createToken(user),
  };
  return res.status(200).json({ dataUser });
};
