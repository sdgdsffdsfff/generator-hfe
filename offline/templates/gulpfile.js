'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var del = require('del');
var processhtml = require('gulp-processhtml');
var clean = require('gulp-clean');
var paths = {
	sass: ['./scss/**/*.scss']
};
var jeditor = require("gulp-json-editor");

//移除无用的CSS
var uncss = require('gulp-uncss');
gulp.task('uncss', function () {
	gulp.src('./www/lib/ionic/css/ionic.min.css')
		.pipe(uncss({
			html: ['./www/index.html', './www/templates/*.html']
		}))
		.pipe(gulp.dest('./out'));
});


//更改json中zip包名称
gulp.task('hc', function () {
	var name = gulp.env.name;
	var zipurl = 'http://test.i.meituan.com/trip/awp/offline-zip/' + name + '.zip';

	gulp.src("offline.json")
		.pipe(jeditor({
			'src': zipurl
		}))
		.pipe(gulp.dest("./"));
})


//清除
gulp.task('clean', function () {
	return gulp.src(['build_web/'], {
			read: false
		})
		.pipe(clean());
});
//压缩css 
gulp.task('mc', ['copy'], function () {
	return gulp.src('www/css/*.css') //压缩的文件
		.pipe(concat('main.min.css')) //合并所有js到main.js
		.pipe(minifyCss()) //执行压缩
		.pipe(gulp.dest('build_web/css')); //输出文件夹
});

gulp.task('mjlib', ['mc'], function () {
	return gulp.src(['www/lib/ionic/js/ionic.bundle.js', 'www/lib/js/jquery.js', 'www/lib/js/highchart.js', 'www/lib/ionic/js/angular/angular-resource.min.js'])
		.pipe(concat('assets.min.js')) //合并所有js到main.js
		.pipe(uglify()) //压缩
		.pipe(gulp.dest('build_web/js')); //输出
});

//压缩js
gulp.task('mj', ['mjlib'], function () {
	return gulp.src('www/js/*/*.js')
		.pipe(concat('main.min.js')) //合并所有js到main.js
		.pipe(uglify()) //压缩
		.pipe(gulp.dest('build_web/js')); //输出
});
//处理html
gulp.task('processhtml', ['mj'], function () {
	return gulp.src('www/index.html')
		.pipe(processhtml())
		.pipe(gulp.dest('build_web/'));
});

gulp.task('copy', ['clean'], function () {
	return gulp.src(['www/**/*.*', '!www/css/*.*', '!www/js/helper/*.*', '!www/js/tab/*.*', '!www/lib/ionic/js/**/*.*', '!www/lib/ionic/scss/**/*.*'])
		.pipe(gulp.dest('build_web/'));
});

gulp.task('build', ['processhtml']);

