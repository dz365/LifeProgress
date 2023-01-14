const LocalStrategy = require("passport-local");
const crypto = require("crypto");

module.exports = async (UserModel, DailyReflectionsModel, passport) => {
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      (username, password, done) => {
        UserModel.findOne({ email: username }, (err, user) => {
          if (err) return done(err);

          if (!user) return done(null, false);

          const isValid =
            crypto
              .pbkdf2Sync(password, user.salt, 10000, 64, "sha512")
              .toString("hex") == user.password;
          return isValid ? done(null, user) : done(null, false);
        });
      }
    )
  );
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
        session: false,
      },
      async (req, email, password, done) => {
        if (!req.body.firstName || !req.body.lastName) {
          return done(null, false, {
            message: "Please enter your first and last name.",
          });
        }
        try {
          const user = await UserModel.findOne({ email });
          if (user) {
            return done(null, false, {
              message: "That email is already taken.",
            });
          }
          const salt = crypto.randomBytes(16).toString("hex");
          const genHash = crypto
            .pbkdf2Sync(password, salt, 10000, 64, "sha512")
            .toString("hex");
          req.body.salt = salt;
          req.body.password = genHash;
          const newUser = new UserModel(req.body);
          await newUser.save();

          const newReflection = {
            year: new Date().getFullYear(),
            month: {
              1: [],
              2: [],
              3: [],
              4: [],
              5: [],
              6: [],
              7: [],
              8: [],
              9: [],
              10: [],
              11: [],
              12: [],
            },
          };

          const newDailyReflections = new DailyReflectionsModel({
            userID: newUser._id,
            reflections: [newReflection],
          });

          await newDailyReflections.save();
          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
