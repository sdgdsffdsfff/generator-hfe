'use strict';

module.exports = {
    deps: ['copyto'],
    task: function compile(gulp) {
        // Load task
        var prefix = require('gulp-prefix')
        var ignore = require('gulp-ignore')
        var replace = require('gulp-replace')
        var t = new Date().getTime()

        // Options
        var prefixUrl = "http://mc.meituan.net/hotel";

        if(gulp.env.env === 'test') {
            prefixUrl = "http://mc.meituan.net/test/hotel";
        }

        return gulp.src('./templates/**/*.*')
            .pipe(ignore('**/node_modules/**'))
            .pipe(prefix(prefixUrl, null, true))
            .pipe(replace(/\?v=\d+\./g, '?v=' + t + '.'))
            .pipe(gulp.dest('build/templates'));
    }
};
