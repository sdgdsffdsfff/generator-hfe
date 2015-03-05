'use strict';

module.exports = {
    deps: ['del'],
    task: function copyto(gulp) {
        // Load task

        // Options
        return gulp.src('./public/**/*')
            .pipe(gulp.dest('./build/public/'));
    }
};
