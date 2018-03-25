const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const userModel = require('./models/user.js');
const env = require('./config/environment.js');
const { jwtAuthentication } = require('./middleware');
const usersRouter = require('./routes/users');
const comp_coursesRouter = require('./routes/comp-courses');
const curr_coursesRouter = require('./routes/curr-courses');
const dev = app.get('env') !== 'production';

mongoose.connect(env.MONGO_DEV_URL);

if (!dev) {
  app.disable('x-powered-by');
  app.use(compression());
  app.use(logger('common'));
  app.use(express.static(path.resolve(__dirname, 'client/build')));
} else {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade'); //extension of views
app.set('trust proxy', 1); // trust first proxy

app.use('/users', usersRouter);
app.use('/api/comp-courses', comp_coursesRouter);
app.use('/api/curr-courses', curr_coursesRouter);
//middleware checker
app.get('/api/middleware', jwtAuthentication, (req, res, next) => {
  res.send(req.user);
});

module.exports = app;
