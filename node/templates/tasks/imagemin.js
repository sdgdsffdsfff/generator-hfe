'use strict';

module.exports = {
    task: function imagemin(gulp) {
		var gulp = require('gulp');
		var imagemin = require('gulp-imagemin');
		var pngquant = require('imagemin-pngquant');
		var util = require('gulp-util');

		// Get act name from command-line param
		var act = util.env.act? util.env.act : '*';
		var srcScope = "public/act/" + act + "/";

        return gulp.src('./' + srcScope + '**/*.{png,jpg,gif}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./' + srcScope));
    }
};
