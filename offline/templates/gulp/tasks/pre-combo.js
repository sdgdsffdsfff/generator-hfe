'use strict';

module.exports = function (gulp, Plugin, config) {
	gulp.task('pre-combo', function () {

		var pc = require('../util/pre-combo');

		gulp.src('src/**/*.html').pipe(pc())
			.pipe(gulp.dest('build'));



	})
};