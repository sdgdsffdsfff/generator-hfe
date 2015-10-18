'use strict';

module.exports = function (gulp, Plugin, config) {
	gulp.task('combo', function () {
		var repoInfoJSON = require(Plugin.path.resolve(process.cwd(),
			'repo-info.json'));
		var version = repoInfoJSON.version;
		var group = repoInfoJSON.group;
		var repoName = repoInfoJSON.name;
		var baseUri = 'http://awp-assets.meituan.net/';
		gulp.src('build/**/*.html')
			.pipe(Plugin.combo(baseUri, null))
			.pipe(gulp.dest('build'));
	})
	gulp.task('combo:prepub', function () {
		var repoInfoJSON = require(Plugin.path.resolve(process.cwd(),
			'repo-info.json'));
		var version = repoInfoJSON.version;
		var group = repoInfoJSON.group;
		var repoName = repoInfoJSON.name;
		var baseUri = 'http://awp-assets.sankuai.com/';
		gulp.src('build/**/*.html')
			.pipe(Plugin.combo(baseUri, null))
			.pipe(gulp.dest('build'));
	})
};
