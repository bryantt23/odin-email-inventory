const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const apiRouter = require('./routes/api')

// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const session = require('express-session');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.post('/login', (req, res) => {
  const submittedPassword = req.body.password;

  if (submittedPassword === process.env.UI_PASSWORD) {
    req.session.isAuthenticated = true;
    res.redirect('/messages');
  } else {
    res.render('index', { title: 'Express', message: 'Incorrect Password' });
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api', apiRouter)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/*
Plan
show messages as a list x 
have a button that to copy that sends to clipboard x

add a create form x
make it work then redirect to messages x

have an edit and delete button x
make the delete button work x
make the edit button work x

make the home page have a link to messages x

lock down the messages pages unless there's a pw

deploy

*/
