'use strict';

module.exports = {
    deps: ['sass'],
    task: function cssmin(gulp) {
        // Load task
        var minifyCSS = require('gulp-minify-css');
        var ignore = require('gulp-ignore');
        var rev = require('gulp-rev');
        var autoprefixer = require('gulp-autoprefixer');

        // Options
        return gulp.src('./build/public/**/*.css')
            .pipe(ignore('**/node_modules/**'))
            .pipe(rev())
            .pipe(autoprefixer({browsers: ['Android >= 2.2', 'iOS >= 4', 'ChromeAndroid >= 30', 'ExplorerMobile >= 10']}))
            .pipe(minifyCSS({noAdvanced: true}))
            .pipe(gulp.dest('./build/public/'))
            .pipe(rev.manifest({path: 'manifest.css.json'}))
            .pipe(gulp.dest('./build/public/'));
    }
};
