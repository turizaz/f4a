const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const User = require('../../models/user');

const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT


const jwtsecret = "mysecretkey"; // ключ для подписи JWT
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp


// Стратегия берёт поля из req.body
// Вызывает для них функцию
passport.use(
    new LocalStrategy(
        {
          usernameField: "email", // 'username' by default
          passwordField: "password",
          passReqToCallback: true, // req for more complex cases
        },
        // Три возможных итога функции
        // done(null, user[, info]) ->
        //   strategy.success(user, info)
        // done(null, false[, info]) ->
        //   strategy.fail(info)
        // done(err) ->
        //   strategy.error(err)
        // TODO: rewrite this, use async/await
        function(req, email, password, done) {
          User.findOne({ email }, (err, user) => {
            if (err) {
              return done(err);
            }
            if (!user || !user.checkPassword(password)) {
              // don't say whether the user exists
              return done(null, false, {
                message: "Нет такого пользователя или пароль неверен."
              });
            }
            return done(null, user);
          });
        }
    )
);

// Ждем JWT в Header
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtsecret,
};

passport.use(
    new JwtStrategy(jwtOptions, function(payload, done) {
      User.findById(payload.id, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
);
