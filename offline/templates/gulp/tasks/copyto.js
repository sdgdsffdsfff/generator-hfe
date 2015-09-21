'use strict';

module.exports = function (gulp, Plugin, config) {

	gulp.task('copyto', function () {
		return gulp.src('src/**/*.*')
			.pipe(gulp.dest('build'))
	})
};