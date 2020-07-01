import { Strategy, StrategyOption } from 'passport-facebook';
import UserModel from '../../models/User';
import sendEmail, { typeMessage } from '../../helpers/nodemailer';

const options: StrategyOption = {
  clientID: process.env.FACEBOOK_APP_ID || 'xxxxxx',
  clientSecret: process.env.FACEBOOK_APP_SECRET || 'xxxxxx',
  callbackURL: '/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'name', 'photos', 'email'],
};
export const FacebookStrategy = new Strategy(
  options,
  async (accessToken, refreshToken, profile, done) => {
    const user = {
      facebookId: profile.id,
      firstName: profile.name?.givenName.toLocaleLowerCase(),
      lastName: profile.name?.familyName.toLocaleLowerCase(),
      userName: `user${Math.floor(Math.random() * Date.now())}`,
      displayName: profile.displayName.toLowerCase(),
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
    };
    try {
      const verifyUser = await UserModel.findOne({
        $or: [{ facebookId: profile.id }, { email: profile.emails[0].value }],
      });
      if (verifyUser) {
        if (verifyUser.facebookId === undefined) {
          await UserModel.findByIdAndUpdate(verifyUser._id, {
            facebookId: profile.id,
          });
        }
        if (verifyUser.photo === undefined) {
          await UserModel.findByIdAndUpdate(verifyUser._id, {
            photo: profile.photos[0].value,
          });
        }
        return done(null, verifyUser);
      } else {
        try {
          const message = typeMessage('confirmAccount', user);
          await sendEmail(message);
        } catch (err) {
          return done(null, null);
        }
        const newUser = await UserModel.create(user);
        return done(null, user);
      }
    } catch (err) {
      console.error(err);
    }
  }
);
