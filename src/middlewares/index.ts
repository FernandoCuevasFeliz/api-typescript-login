import { Express, json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import JwtStrategy from './passport/jwt';
import GoogleStrategy from './passport/google';
import UserModel from '../models/User';
import { UserI } from '../interfaces/user';
import { FacebookStrategy } from './passport/facebook';

function middlewares(app: Express) {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(cors());

  // passport

  passport.serializeUser((user: UserI, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    await UserModel.findById(id, (err, user) => done(err, user));
  });

  app.use(passport.initialize());
  app.use(passport.session());

  // Strategies
  passport.use(JwtStrategy);
  passport.use(GoogleStrategy);
  passport.use(FacebookStrategy);
}

export default middlewares;
