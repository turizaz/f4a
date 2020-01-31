const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const User = require('../../models/user');
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT
const users = require('../../db/queries/users');
const bcrypt = require('bcryptjs');
const jwtsecret = 'mysecretkey'; // ключ для подписи JWT

// Стратегия берёт поля из req.body
// Вызывает для них функцию
passport.use(
    new LocalStrategy(
        {
          usernameField: 'email', // 'username' by default
          passwordField: 'password',
          passReqToCallback: true, // req for more complex cases
        },
        async function(req, email, password, done) {
          try {
            const user = await users.getSingleUserByEmail(email).first();
            if (!user || !comparePass(password, user.password)) {
              return done(null, false, {
                message: 'Нет такого пользователя или пароль неверен.',
              });
            }
            return done(null, user);
          } catch (error) {
            return done(error);
          }
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
      })
    })
);

/**
 * Compare passwords
 * @param {string} userPassword
 * @param {string} databasePassword
 * @return {*}
 */
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

export {}