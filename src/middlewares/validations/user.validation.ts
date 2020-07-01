import { check } from 'express-validator';

export const userSigninValidator = () => {
  return [
    check('userName').notEmpty().isLength({ min: 5 }),
    check('firstName').notEmpty().isLength({ min: 3 }),
    check('lastName').notEmpty().isLength({ min: 3 }),
    check('email').isEmail().isLength({ min: 10 }),
    check('password').notEmpty().isLength({ min: 6 }),
    check('confirmPassword').notEmpty().isLength({ min: 6 }),
  ];
};

export const userSignupValidator = () => {
  return [
    check('username').notEmpty().isLength({ min: 5 }),
    check('password').notEmpty().isLength({ min: 6 }),
  ];
};
