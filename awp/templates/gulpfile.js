'use strict'
var gulp = require('gulp'),
	gulpConfig = require('./gulp/gulp.config'),
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
gulpLoadPlugins.jeditor = require("gulp-json-editor");
gulpLoadPlugins.sass = require('gulp-sass');

gulpTaskList.forEach(function (taskfile) {
	require('./gulp/tasks/' + taskfile)(gulp, gulpLoadPlugins, gulpConfig);
});

//启动服务
gulp.task('server', ['sass:watch'], function () {
	exec('proxrox start repo-info.json', function (err, stdout, stderr) {
		console.log(stdout);
		if (stderr) {
			console.log(stdout);
			console.log(stderr);
		}
	});
});

gulp.task('server:stop', function () {
	exec('proxrox stop');
})

//项目默认构建
gulp.task('build', ['del', 'copyto', 'cssmin', 'jsmin'], function () {
	//pre-combo和combo之间的异步操作
	//TODO:promise来处理
	setTimeout(function () {
		gulp.run('pre-combo');
	}, 2000);

	setTimeout(function () {
		gulp.run('combo');
	}, 4000);
});

//生成离线包
gulp.task('zip', function () {
	exec('chmod +x build.sh && ./build.sh', function (err, stdout, stderr) {
		return;
	})
});

//新建分支
var repoInfoJSON = require(path.resolve(process.cwd(), 'repo-info.json'));
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

//更改json中zip包名称，'shell_'前缀的task是供shell脚本调用
gulp.task('shell_modify-offline-json', ['mj'], function () {
	console.log('modify-offline-json')
});

var command = gulpConfig.exec;
//预发布到测试环境，示例命令===>[gulp prepub -m 'update info']
gulp.task('prepub', function () {
	var msg = gulp.env.m;
	util.execGitCommand(command.prepub(repoInfoJSON.version, msg));
});
//发布到线上，示例命令===>[gulp publish]
gulp.task('publish', function () {
	util.execGitCommand(command.publish(repoInfoJSON.version));
});