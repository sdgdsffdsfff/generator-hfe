'use strict';

module.exports = {
    deps: ['copyto'],
    task: function jsmin(gulp) {
        // Load task
        var uglify = require('gulp-uglify')
        var ignore = require('gulp-ignore')
        var rev = require('gulp-rev')

        // Options
        return gulp.src('./build/public/**/*.js')
            .pipe(ignore.exclude(['**/node_modules/**', '**/*.css.js', '**/*.css-*.js']))
            .pipe(rev())
            .pipe(uglify())
            .pipe(gulp.dest('./build/public/'))
            .pipe(rev.manifest({path: 'manifest.js.json'}))
            .pipe(gulp.dest('./build/public/'));
    }
};
