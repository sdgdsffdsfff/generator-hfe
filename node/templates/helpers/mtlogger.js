'use strict';

var logger = require('morgan');
var Scribe = require('scribe').Scribe;
var Logger = require('scribe').Logger;
// var scribe = new Scribe('127.0.0.1', 4252, {autoReconnect: true});

Logger.prototype.logMessage = function (level, msg) {
    var str = this.levelNames[level] + " " + this.hostname + " " + this.scribe.host + " " + "-" + " " + msg;

    this.lastLoggedLevel = level;
    this.lastLoggedLine = str;

    if (this.scribe) {
        this.scribe.send(this.scribeCategory, this.formatTimestamp(new Date()) + "\t" + str);
    } else {
        process.stdout.write(this.levelNames[level] + "\t" + process.pid + "\t" + this.extractCalledFromStack() + "\t" + msg + "\n");
    }

};

// var mtlogger = new Logger(scribe, 'hotel_fe_static');

logger.format('mtlogger', function(tokens, req, res) {
    var status = res.statusCode;
    var url = tokens.url(req, res);
    var method = tokens['method'](req, res);
    var responseTime = tokens['response-time'](req, res);
    var date = tokens['date'](req, res);
    var referrer = tokens['referrer'](req, res) || '';
    var remoteAddr = tokens['remote-addr'](req, res);
    var httpVersion = tokens['http-version'](req, res);
    var userAgent = tokens['user-agent'](req, res);
    var contentLength = res._headers['content-length'] || '';
    var scribe = new Scribe('127.0.0.1', 4252, {autoReconnect: true});
    var mtlogger = new Logger(scribe, 'hotel_fe_static');

    scribe.open(function(err) {
        if(err) {
            return console.log(err);
        }

        mtlogger.info(
            'method=' + method, 
            'url=' + url, 
            'status=' + status, 
            'responseTime=' + responseTime, 
            'contentLength=' + contentLength,
            'referrer=' + referrer,
            'remoteAddr=' + remoteAddr,
            'httpVersion=' + httpVersion,
            'userAgent=' + userAgent,
            '\n'
        );

        scribe.close();
    });
});

module.exports = logger('mtlogger');
