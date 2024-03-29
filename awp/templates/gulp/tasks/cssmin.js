

'use strict';

module.exports = function (gulp, Plugin, config) {

	gulp.task('cssmin',['copyto'], function () {
		return gulp.src('src/**/*.css')
        .pipe(Plugin.cssmin())
        .pipe(Plugin.rename({suffix: '.min'}))
        .pipe(gulp.dest('build'));
	})
};