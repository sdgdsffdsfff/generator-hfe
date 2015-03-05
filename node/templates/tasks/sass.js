'use strict';

module.exports = {
    deps: ['copyto'],
    task: function sass(gulp) {
        // Load task
        var sass = require('gulp-sass')
        var ignore = require('gulp-ignore')

        // Options
        return gulp.src('./build/public/**/*.scss')
            .pipe(ignore('**/node_modules/**'))
            .pipe(sass())
            .pipe(gulp.dest('./build/public'));
    }
};
