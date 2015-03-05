'use strict';

module.exports = {
    deps: ['jsmin'],
    task: function(gulp) {
        var fs = require('fs');
        var crypto = require('crypto');
        var template = require('gulp-template');
        var rename = require('gulp-rename');
        var uglify = require('gulp-uglify');
        var jsrev = require('hfe/build/public/manifest.js.json');

        var revString = JSON.stringify(jsrev);
        var newName = ('touch/js/config-' +
                       crypto.createHash('md5').update(revString).digest('hex').slice(0, 8) +
                       '.js');

        jsrev['touch/js/config.js'] = newName;
        fs.writeFileSync('./build/public/manifest.js.json', JSON.stringify(jsrev));

        var prefixUrl = "http://mc.meituan.net/hotel/";

        if(gulp.env.env === 'test') {
            prefixUrl = "http://mc.meituan.net/test/hotel/";
        }

        return gulp.src('./build/public/touch/js/config.js.tpl')
            .pipe(template({
                manifest: jsrev,
                baseUrl: prefixUrl
            }))
            .pipe(uglify())
            .pipe(rename(newName))
            .pipe(gulp.dest('./build/public'));
    }
};
