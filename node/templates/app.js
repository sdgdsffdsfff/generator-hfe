/* jshint node: true */
'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var juicer = require('juicer');
var juicerExpressAdapter = require('juicer-express-adapter');
var fs = require('fs');
var enrouten = require('express-enrouten');
var abtest = require('./helpers/abtest');
var mtlogger = require('./helpers/mtlogger');
var ecomAuth = require('hfe/helpers/hotel-ecom-auth');
var rewriteModule = require('http-rewrite-middleware');
var raven = require('raven');
var app = express();

// keep the same rule with nginx rewrite
var rewriteMiddleware = rewriteModule.getMiddleware([
    // Internal rewrite
    {from: '^/jiudian/(.*)$', to: '/$1'},
    {from: '^/(admin/.*)$', to: '/lvyou/$1'}
]);

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.engine('html', juicerExpressAdapter);

if (app.get('env') === 'production') {
    app.set('views', path.join(__dirname, 'build/templates'));
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(abtest.middleware());
app.use(rewriteMiddleware);

// scribe request log while in production
if (app.get('env') === 'production') {
    app.use(mtlogger);
}

app.use('/ecom', ecomAuth());

/// dynamically include controllers
app.use(enrouten({directory: 'controllers'}));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// catch internal error to sentry
if (app.get('env') === 'production') {
    app.use(raven.middleware.express('http://9b66463e2b4c4deeab11aa903fd3b56f:ca28ce9ddd8a4f609f194d06138321c0@sentry.sankuai.com/132'));
}

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('buildin/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('buildin/error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
