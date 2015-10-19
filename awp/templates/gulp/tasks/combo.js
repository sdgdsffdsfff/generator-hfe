'use strict';

module.exports = function (gulp, Plugin, config) {
	gulp.task('combo', ['del', 'copyto'], function () {
		var repoinfo = require('../../repo-info.json');
		var baseUri = 'http://awp-assets.meituan.net/';
		gulp.src('src/**/*.html')
			.pipe(Plugin.precombo(repoinfo))
			.pipe(Plugin.combo(baseUri, null))
			.pipe(Plugin.ssi())
			.pipe(gulp.dest('build'));
	});
	gulp.task('combo:prepub', ['del', 'copyto'], function () {
		var repoinfo = require('../../repo-info.json');
		var baseUri = 'http://awp-assets.sankuai.com/';
		gulp.src('src/**/*.html')
			.pipe(Plugin.precombo(repoinfo))
			.pipe(Plugin.combo(baseUri, null))
			.pipe(Plugin.ssi())
			.pipe(gulp.dest('build'));
	})
};