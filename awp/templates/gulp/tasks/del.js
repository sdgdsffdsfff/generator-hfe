
'use strict';

module.exports = function (gulp, Plugin, config) {
	gulp.task('del', function () {
		Plugin.del.sync('build');
	})
};
