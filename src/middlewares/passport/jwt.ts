import UserModel from '../../models/User';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
const SECRET_KEY = process.env.SECRET_KEY || 'thisIsMySecretKey';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const JwtStrategy: Strategy = new Strategy(opts, async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    console.error(err);
  }
});

export default JwtStrategy;
