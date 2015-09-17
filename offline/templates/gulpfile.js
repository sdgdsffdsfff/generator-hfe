'use strict'
var gulp = require('gulp'),
	config = require('./gulp/gulp.config'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	gulpTaskList = require('fs').readdirSync('./gulp/tasks/'),
	util = require('./gulp/util/index');

var exec = require('child_process').exec,
	path = require('path'),
	fs = require('fs-extra');


gulpLoadPlugins.del = require('del');
gulpLoadPlugins.cssmin = require('gulp-cssmin');
gulpLoadPlugins.rename = require('gulp-rename');
gulpLoadPlugins.jsmin = require('gulp-jsmin');
gulpLoadPlugins.combo = require('gulp-combo');
gulpLoadPlugins.precombo = require('gulp-pre-combo');
gulpLoadPlugins.path = path;



gulpTaskList.forEach(function (taskfile) {
	require('./gulp/tasks/' + taskfile)(gulp, gulpLoadPlugins, config);
});


gulp.task('default', ['del', 'copyto', 'cssmin', 'jsmin'], function () {
	
	setTimeout(function(){
		gulp.run('pre-combo');
	},2000);

	setTimeout(function(){
		gulp.run('combo');
	},4000);
});


gulp.task('newbranch', function () {
	exec('git branch -a & git tag', function (err, stdout, stderr, cb) {

		var versions = stdout.match(/\d+\.\d+\.\d+/ig),
			r = util.getBiggestVersion(versions);

		if (!r || !versions) {
			r = '0.1.0';
		} else {
			r[2]++;
			r = r.join('.');
		}

		console.log('新分支：daily/' + r);
		var execStr = 'git checkout -b daily/' + r;
		exec(execStr);

		// 回写入repo-info.json 的 version
		try {

			var repoInfoJSON = require(path.resolve(process.cwd(), 'repo-info.json'));
			repoInfoJSON.version = r;
			fs.writeJson("./repo-info.json", repoInfoJSON, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("update repo-info.json.");
				}
			});

			var offlineJSON = require(path.resolve(process.cwd(), 'offline.json'));
			offlineJSON.version = r;
			fs.writeJson("./offline.json", offlineJSON, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("update offline.json.");
				}
			});
		} catch (e) {
			console.log('未找到repo-info.json');
		}

	});
})