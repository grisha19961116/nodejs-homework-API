const passport = require("passport");
const UserModel = require("../model/user");
const { Strategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async ({ id }, done) => {
    try {
      const user = await UserModel.findById(id);
      if (!user) return done(new Error("User not found"));
      if (!user.token) return done(null, false);
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
