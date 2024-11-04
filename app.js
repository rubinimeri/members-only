const express = require('express');
const path = require('path');
const initializeSession = require('./middleware/initializeSession');
const authRouter = require('./routes/authRouter');
const indexRouter = require('./routes/indexRouter');
const passport = require('./strategies/localStrategy');

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(initializeSession);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/", indexRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));