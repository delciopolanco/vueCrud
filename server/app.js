var express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  index = require('./routes/index'),
  users = require('./routes/users'),
  app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Routes
app.use('/api/', index);
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send('<h1>Are you missing?</h1>');
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