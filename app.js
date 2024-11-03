const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db/pool');
const path = require('path');
const authRouter = require('./routes/authRouter');
const indexRouter = require('./routes/indexRouter');
const passport = require('./strategies/localStrategy');

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
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
}))
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/", indexRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));