'use strict';

module.exports = function (gulp, Plugin, config) {
	gulp.task('pre-combo', ['del', 'copyto', 'jsmin', 'cssmin', ], function () {
		var repoinfo = require('../../repo-info.json');
		gulp.src('src/**/*.html')
			.pipe(Plugin.precombo(repoinfo))
			.pipe(gulp.dest('build'))
			.on('end', function () {
				gulp.run('combo')
			})
	});
	gulp.task('pre-combo:prepub', ['del', 'copyto', 'jsmin', 'cssmin', ], function () {
		var repoinfo = require('../../repo-info.json');
		gulp.src('src/**/*.html')
			.pipe(Plugin.precombo(repoinfo))
			.pipe(gulp.dest('build'))
			.on('end', function () {
				gulp.run('combo:prepub')
			})
	})
};