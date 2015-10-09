'use strict';



/**
 * 打包成功后，修改离线包的线上地址和离线包版本号
 */
var util = require('../util/index');

module.exports = function (gulp, Plugin, config) {
	gulp.task('mj', function () {
		var name = gulp.env.name;
		var zipUrl = config.zipPathPrefix + name + '.zip';
		gulp.src("offline.json")
			.pipe(Plugin.jeditor(function (json) {
				json.data[0].src = zipUrl;
				var zv = json.data[0].zipVersion; //获取配置文件中的版本号
				console.log(util.formatZipVersion)
				json.data[0].zipVersion = util.formatZipVersion(zv);
				return json;
			}))
			.pipe(gulp.dest("./"));
	})
};