require('coffee-script/register');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var noble = require('noble');

var routes = require('./routes/index');
var users = require('./routes/user');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});
module.exports = app;

//bluetooth
noble.on('stateChange', function(state) {
  // possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
  console.log("state");
  // noble.startScanning();
  noble.startScanning([], true);
  //E599A052E35C4CB99D66B136E8CDBBB7
  //  manufacturerData: <Buffer 8c 00 b1 fe 5e f0 c4 33 0a 65 e2>,
  var addressToTrack = 'Buffer 8c 00 b1 fe 5e f0 c4 33 0a 65 e2';
  //var addressToTrack = 'Buffer 8c 00 b1 fe 5e f0 c4 33 0a 65 e2';
  noble.on('discover', function(peripheral){
    // console.log(peripheral.uuid + ' ' + peripheral.advertisement.manufacturerData + ' ' + peripheral.rssi);
    console.log(peripheral);
    // console.log(peripheral.advertisement.serviceUuids);
    // console.log(peripheral.advertisement.manufacturerData);
    if(peripheral.advertisement.manufacturerData == addressToTrack){
      console.log('found: ' + peripheral.rssi);
      //socket.emit('deviceData', {mac: peripheral.uuid, rssi:peripheral.rssi});
    }
  });
  // ...
});
