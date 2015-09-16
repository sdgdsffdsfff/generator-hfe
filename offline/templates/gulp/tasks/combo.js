'use strict';

module.exports = function (gulp, Plugin, config) {



	gulp.task('combo', function () {
		var repoInfoJSON = require(Plugin.path.resolve(process.cwd(), 'repo-info.json'));
		// console.log(repoInfoJSON);
		var version = repoInfoJSON.version;
		var group = repoInfoJSON.group;
		var repoName = repoInfoJSON.name;
		var baseUri = 'http://mc.meituan.net/combo?f=';
		gulp.src('build/**/*.html')
			.pipe(Plugin.combo(baseUri, null))
			.pipe(gulp.dest('build'));
	})
};