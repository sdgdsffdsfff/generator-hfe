'use strict';

module.exports = function (gulp, Plugin, config) {
	gulp.task('pre-combo', function () {
		var repoinfo = require('../../repo-info.json');

		gulp.src('src/**/*.html')
			.pipe(Plugin.precombo(repoinfo))
			.pipe(gulp.dest('build'));
	})
};