var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');


//load database
require('./app_api/models/db');

//load passport config
require('./app_api/config/passport');

//load api routes
var reportsApi = require('./app_api/routes/reports');
var usersApi = require('./app_api/routes/users');
var authApi = require('./app_api/routes/authentication');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(express.static(path.join(__dirname, 'public/templated')));


//minifies angular client app
require('./app_server/scripts/uglifyAngular.js');


/*Passport should be initialized in app.js after the static routes have been defined*/
app.use(passport.initialize());
/*and before the routes that are going to use authentication*/

//routes for api
app.use('/api', reportsApi);
app.use('/api', usersApi);

//login and register public api route
app.use('/api', authApi);


//central route to Single Page App
app.get('/', function(req, res){

  res.sendFile(__dirname + '/app_server/template/template.html');

});

app.get('*', function(req, res){

  res.status(404);
  res.json({"message":"page not found"});

});


//Catch unauthorized errors
app.use(function(err, req, res, next){

  if(err.name === 'UnauthorizedError'){
    res.status(401);
    res.json({"message": "É preciso estar logado."});
  }

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
