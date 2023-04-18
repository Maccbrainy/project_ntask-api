const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const config = require('./config');

module.exports = app => {
    const Users = app.models.users;
    const { jwt } = config;
    const params = {
        secretOrKey: jwt.secret,
        jwtFromRequest: ExtractJwt.fromHeader("authorization")
    };
    const strategy = new Strategy(params, (payload, done) => {
        Users.findByPk(payload.id)
        .then(user => {
            if(user){
                return done(null, {
                    id: user.id,
                    email: user.email,
                });
            }
            return done(null, false);
        }).catch(error => done(error, null));
    });
    passport.use(strategy);
    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate("jwt", jwt.options)
    };
}