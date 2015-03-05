'use strict';

module.exports = {
    deps: ['cssmin', 'jsmin', 'require-config', 'compile'],
    task: function htmlrev(gulp) {
        var ignore = require('gulp-ignore');
        var replace = require('gulp-replace');
        var fs = require('fs');
        var glob = require('glob');

        var getManifest = function() {
            var manifest = {};
            var arr = glob.sync('build/public/manifest.*.json');
            arr.forEach(function(path) {
                var file = JSON.parse(fs.readFileSync(path, 'utf8'));
                for (var key in file) {
                    manifest[key] = file[key];
                }
            });

            return manifest;
        };

        var stream = gulp.src('./build/templates/**/*.*')
            .pipe(ignore('**/node_modules/**'));
        var manifest = getManifest();

        for (var key in manifest) {
            stream = stream.pipe(replace(key, manifest[key]));
        }

        return stream.pipe(gulp.dest('build/templates'));
    }
};
