import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import UserModel from '../../models/User';
import sendEmail, { typeMessage } from '../../helpers/nodemailer';

const options: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID || 'xxxxx',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'xxxxx',
  callbackURL: '/api/auth/google/callback',
};
// 1,000,000,000,000
const GoogleStrategy: Strategy = new Strategy(
  options,
  async (accessToken, refreshToken, profile, done) => {
    const user = {
      googleId: profile.id,
      firstName: profile.name?.givenName.toLocaleLowerCase(),
      lastName: profile.name?.familyName.toLocaleLowerCase(),
      userName: `user${Math.floor(
        Math.random() * Date.now() - 1000000 * 10000000
      )}`,
      displayName: profile.displayName.toLowerCase(),
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
    };

    try {
      const verifyUser = await UserModel.findOne({
        $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
      });

      if (verifyUser) {
        if (verifyUser.googleId === undefined) {
          await UserModel.findByIdAndUpdate(verifyUser._id, {
            googleId: profile.id,
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

export default GoogleStrategy;
