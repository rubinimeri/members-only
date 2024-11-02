const express = require('express');
const app = express();
const path = require('path');
const authRouter = require('./routes/authRouter');

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));