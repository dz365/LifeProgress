const LocalStrategy = require("passport-local");
const crypto = require("crypto");

module.exports = async (UserModel, passport) => {
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

          if (!user)
            return done(null, false, { message: "Incorrect username." });

          const isValid =
            crypto
              .pbkdf2Sync(password, user.salt, 10000, 64, "sha512")
              .toString("hex") == user.password;
          return isValid ? done(null, user) : done(null, false);
        });
      }
    )
  );
};
