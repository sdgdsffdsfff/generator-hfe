'use strict';

module.exports = function (gulp, Plugin, config) {
	gulp.task('sass', function () {
		gulp.src('src/**/*.scss')
			.pipe(Plugin.sass.sync().on('error', Plugin.sass.logError))
			.pipe(gulp.dest('src'));
	});
	gulp.task('sass:watch', function () {
		gulp.watch('src/**/*.scss', ['sass']);
	});
};