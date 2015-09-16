/* jshint node: true */
'use strict';

var through = require('through2');
var path = require('path');
var repoinfo = require('../../repo-info.json');

// cheerio = require("cheerio");

module.exports = function () {


	return through.obj(function (file, enc, cb) {

		// console.log(JSON.stringify(file));
		var pathArr = file.path.split('/');
		pathArr.pop();
		// console.log(pathArr.join('/'))
		var thisPath = pathArr.join('/') + '/';


		// console.log(path.join('/Library/WebServer/Documents/jk/test/666666/src/pages/abc/','./index.js'))

		var chunk = String(file.contents);

		function handleScript($, $1) {
			$1 = path.join(thisPath, $1);

			var projectname = file.cwd.split('/').pop();
			var relative = $1.replace(file.base, '');
			var version = repoinfo.version;
			// console.log(projectname + '/' + version + relative);
			var finalpath = projectname + '/' + version + '/' + relative;

			return '<script src=\"' + finalpath + '\"></script>';
		}

		chunk = chunk.replace(/<script[^>]+?src="([^"]+)"[^>]*><\/script>/igm, handleScript);
		chunk = chunk.replace(/<link[^>]+?href="([^"]+?)"[^>]+?rel="stylesheet"[^>]*>/igm, function ($, $1) {
			$1 = path.join(thisPath, $1);

			var projectname = file.cwd.split('/').pop();
			var relative = $1.replace(file.base, '');
			var version = repoinfo.version;
			// console.log(projectname + '/' + version + relative);
			var finalpath = projectname + '/' + version +  '/' + relative;

			return '<link href=\"' + finalpath + '\" rel="stylesheet"></script>';
		});
		chunk = chunk.replace(/<link[^>]+?rel="stylesheet"[^>]+?href="([^"]+?)"[^>]*>/igm, function ($, $1) {
			$1 = path.join(thisPath, $1);

			var projectname = file.cwd.split('/').pop();
			var relative = $1.replace(file.base, '');
			var version = repoinfo.version;
			// console.log(projectname + '/' + version + relative);
			var finalpath = projectname + '/' + version +  '/' + relative;

			return '<link rel="stylesheet" href=\"' + finalpath + '\"></script>';
		});

		// console.log(chunk);
		file.contents = new Buffer(chunk);
		cb(null, file);
	});
};