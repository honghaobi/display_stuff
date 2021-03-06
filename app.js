var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

//app.use('/', routes);
//app.use('/users', users);

//app.use(function(req, res, next) {
  //req.rawBody = '';
  //req.setEncoding('utf8');

  //req.on('data', function(chunk) {
    //req.rawBody += chunk;
  //});

  //req.on('end', function() {
    //next();
  //});
//});

app.use(function(req, res, next) {
  //console.log(req.rawBody);
  console.log(req);
  console.log(req.files);
  if (req.files.file) {
    console.log('file!');
  }
  req.files.file.mv('/development/galvanize/display_stuff/new/file.png', function() {
    console.log('yee');
    next();
  });
});

app.use('/', function(req, res, next) {
  res.send('ok');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
