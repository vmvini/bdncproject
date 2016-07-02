var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_server/models/db');

var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*meu middleware que só imprime esse texto antes de cada requisição*/
app.use(function(req, res, next){
  console.log("STUDYING NODEJS/EXPRESS DEVELOPMENT");
  next();
});



/*USANDO MIDDLEWARE DE ROTAS*/
/*MIDDLEWARE COM MOUNT PATH*/
app.use('/', routes);
app.use('/users', users);


/*SE NO MIDDLEWARE ABAIXO, É PORQUE NÃO ENCONTROU A URL REQUISITADA*/
// catch 404 and forward to error handler
/*MIDDLEWARE SEM MOUNT PATH*/
/*essa função anonima é sempre executada quando o app recebe uma requisição*/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*MIDDLEWARE SEM MOUNT PATH*/
/*essa função anonima é sempre executada quando o app recebe uma requisição*/
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
/*MIDDLEWARE SEM MOUNT PATH*/
/*essa função anonima é sempre executada quando o app recebe uma requisição*/
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
