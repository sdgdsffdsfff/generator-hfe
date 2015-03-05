'use strict';

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');

module.exports = {
    task: function(gulp) {
        gulp.src('public/**/*.scss')
            .pipe(watch('public/**/*.scss'))
            .pipe(sourcemaps.init())
            .pipe(sass({errLogToConsole: true}))
            .pipe(autoprefixer({browsers: ['Android >= 2.2', 'iOS >= 4', 'ChromeAndroid >= 30', 'ExplorerMobile >= 10']}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('public'));

        nodemon({
            script: 'index.js',
            nodeArgs: ['--debug'],
            ext: 'js',
            watch: [
                'index.js',
                'app.js',
                'controllers/',
                'configs/',
                'helpers/',
                'models/'
            ]
        });
    }
};
