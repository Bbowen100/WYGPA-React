const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const userModel = require('./models/user.js');
const env = require('./config/environment.js');
const { jwtAuthentication } = require('./middleware');
var usersRouter = require('./routes/users');
var comp_coursesRouter = require('./routes/comp-courses');
var curr_coursesRouter = require('./routes/curr-courses');

mongoose.connect(env.MONGO_DEV_URL);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade'); //extension of views
app.set('trust proxy', 1) // trust first proxy

app.use('/users', usersRouter);
app.use('/api/comp-courses', comp_coursesRouter);
app.use('/api/curr-courses', curr_coursesRouter);
//middleware checker
app.get('/api/middleware', jwtAuthentication, (req, res, next)=>{
  res.send(req.user)
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
