'use strict'
var gulp = require('gulp'),
	gulpConfig = require('./gulp/gulp.config'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	gulpTaskList = require('fs').readdirSync('./gulp/tasks/'),
	util = require('./gulp/util/index');
	repoInfoJSON

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
gulpLoadPlugins.jeditor = require("gulp-json-editor");

gulpTaskList.forEach(function (taskfile) {
	require('./gulp/tasks/' + taskfile)(gulp, gulpLoadPlugins, gulpConfig);
});


gulp.task('default', ['del', 'copyto', 'cssmin', 'jsmin'], function () {

	setTimeout(function () {
		gulp.run('pre-combo');
	}, 2000);

	setTimeout(function () {
		gulp.run('combo');
	}, 4000);
});
var repoInfoJSON = require(path.resolve(process.cwd(), 'repo-info.json'));
//新建分支
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
});

//生成离线包
gulp.task('zip', function () {
	exec('chmod +x build.sh && ./build.sh', function (err, stdout, stderr) {
		return;
	})
});

//更改json中zip包名称
gulp.task('modify-offline-json', ['mj'], function () {
	console.log('modify-offline-json')
});

var command = gulpConfig.exec;
//预发布
gulp.task('prepub',function(){
	var msg = gulp.env.m;
	util.execGitCommand(command.prepub(repoInfoJSON.version,msg));
});
//发布
gulp.task('publish',function(){
	util.execGitCommand(command.publish(repoInfoJSON.version));
});
//打tag
gulp.task('tag',function(){
	util.execGitCommand(cocommand.tag(repoInfoJSON.version));
});

