import { Router } from 'express';
import passport from 'passport';
import {
  signInCtl,
  signUpCtl,
  googleAuthCtl,
  googleCallbackCtl,
  googleCtl,
  FacebookAuthCtl,
  FacebookCallbackCtl,
  FacebookCtl,
} from '../controllers/auth.controllers';

import {
  userSigninValidator,
  userSignupValidator,
} from '../middlewares/validations/user.validation';

const router = Router();

//? @desc SignIn with JWT
//? @route Post /api/auth/signin
router.post('/signin', userSigninValidator(), signInCtl);

//? @desc SignUp with JWT
//? @route Post /api/auth/signup
router.post('/signup', userSignupValidator(), signUpCtl);

//? @desc Auth with Google
//? @route Get /api/auth/google
router.get('/google', googleAuthCtl);

/*
 * @desc Google Auth Callback
 * @route /api/auth/google/callback
 * @access public
 */
router.get('/google/callback', googleCallbackCtl, googleCtl);

/*
 * @desc Facebook Auth
 * @route /api/auth/facebook
 */

router.get('/facebook', FacebookAuthCtl);
/*
 * @desc Facebook Auth Callback
 * @route /api/auth/facebook/callback
 * @access public
 */
router.get('/facebook/callback', FacebookCallbackCtl, FacebookCtl);

export default router;
