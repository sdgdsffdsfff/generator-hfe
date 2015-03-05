'use strict';

module.exports = {
    deps: ['htmlrev'],
    task: function combo(gulp) {
        var ignore = require('gulp-ignore');
        var replace = require('gulp-replace');
        var combo = require('gulp-combo');
        var fs = require('fs');
        var glob = require('glob');

        return gulp.src('./build/templates/**/*.*')
            .pipe(ignore('**/node_modules/**'))
            .pipe(combo(null, {async: true}))
            .pipe(gulp.dest('build/templates'));
    }
};
