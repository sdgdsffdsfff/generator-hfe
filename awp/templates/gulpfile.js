'use strict'
var gulp = require('gulp'),
	gulpConfig = require('./gulp/gulp.config'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	gulpTaskList = require('fs').readdirSync('./gulp/tasks/'),
	util = require('./gulp/util/index');

var exec = require('child_process').exec,
	path = require('path'),
	fs = require('fs-extra');

gulpLoadPlugins.repoInfoJSON = require(path.resolve(process.cwd(), 'repo-info.json'));
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
	var suffix = taskfile.split('.').pop();
	if (suffix == 'js') { //过滤其它文件
		require('./gulp/tasks/' + taskfile)(gulp, gulpLoadPlugins, gulpConfig);
	}
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

//项目默认构建:publish环境
gulp.task('build', ['del', 'copyto', 'cssmin', 'jsmin', 'pre-combo', 'combo']);
//项目默认构建：prepub环境
gulp.task('build:prepub', ['del', 'copyto', 'cssmin', 'jsmin', 'pre-combo:prepub', 'combo:prepub']);

//生成离线包
gulp.task('zip', function () {
	exec('chmod +x build.sh && ./build.sh', function (err, stdout, stderr) {
		console.log(stdout);
		if (err) {
			console.log(stderr);
		}
	})
});

//新建分支
gulp.task('newbranch', function () {
	exec('git branch -a && git tag', function (err, stdout, stderr, cb) {
		//非GIT仓库
		if (err) {
			console.log(stderr);
			return;
		}
		var versions = stdout.match(/\d+\.\d+\.\d+/ig),
			r = util.getBiggestVersion(versions);

		if (!r || !versions) {
			r = '0.1.0';
		} else {
			r[2]++;
			r = r.join('.');
		}
		console.log('New branch name：daily/' + r);
		var execStr = 'git checkout -b daily/' + r;
		exec(execStr);

		// 回写入repo-info.json 的 version
		try {
			gulpLoadPlugins.repoInfoJSON.version = r;
			fs.writeJson("./repo-info.json", gulpLoadPlugins.repoInfoJSON, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Update repo-info.json file successfully");
				}
			});
			var offlineJSON = require(path.resolve(process.cwd(), 'offline.json'));
			offlineJSON.data[0].version = r;
			fs.writeJson("./offline.json", offlineJSON, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Update offline.json file successfully");
				}
			});
		} catch (e) {
			console.log('Can not find repo-info.json file, please try again.');
		}
	});
});

//更改json中zip包名称，'shell_'前缀的task是供shell脚本调用
gulp.task('shell_modify-offline-json', ['mj'], function () {
	console.log('modify-offline-json')
});

var command = gulpConfig.exec;
//预发布到测试环境，示例命令===>[gulp prepub -m 'update info']
gulp.task('prepub', ['build:prepub', 'prepub:html'], function () {
	var msg = gulp.env.m;
	util.execGitCommand(command.prepub(gulpLoadPlugins.repoInfoJSON.version, msg));
});

//发布到线上，示例命令===>[gulp publish]
gulp.task('publish', ['build', 'publish:html'], function () {
	util.execGitCommand(command.publish(gulpLoadPlugins.repoInfoJSON.version));
});