const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const db = require("../db/queries");

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id)
        return done(null, user);
    } catch (err) {
        return done(err);
    }
})

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUser(username);

            if (!user) {
                return done(null, false, {message: "Incorrect username"});
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, {message: "Incorrect password"});
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

module.exports = passport;