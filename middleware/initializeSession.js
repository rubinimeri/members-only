const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("../db/pool");

const initializeSession = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
        pool,
        tableName: "session"
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    }
});

module.exports = initializeSession;