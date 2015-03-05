/* jshint node: true */
'use strict';

var request = require('request');

module.exports = function(router) {
    router.get('/index', function(req, res) {
        res.render('index', {
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            referer: req.headers.referer
        });
    });

    router.get('/main', function(req, res) {
        var request = request.defaults({headers: {cookie: req.headers.cookie}});

        request('http://i.meituan.com/api', function(error, response, body) {
            var data = {};

            try {
                data = JSON.parse(body);
            } catch(e) {}

            res.render('main', {
                data: data,
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                referer: req.headers.referer
            });
        });
    });
};
