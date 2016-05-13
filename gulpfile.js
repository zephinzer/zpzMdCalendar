/**
 * Build script for zpzMdCalendar
 */
var gulp = require('gulp'),
	gulpAngularTemplateCache = require('gulp-angular-templatecache'),
	gulpConcat = require('gulp-concat'),
	gulpMinifyCss = require('gulp-minify-css'),
	gulpRename = require('gulp-rename'),
	gulpUglify = require('gulp-uglify');


/**
 * Used for compiling html into modules
 */
gulp.task('build-html', function() {
	return gulp.src(require('./config').files.html)
		.pipe(gulpAngularTemplateCache('zpz-md-calendar.templates.data.js', {
			root: 'zpz/mdcalendar/template/',
			module: 'zpzMdCalendarTemplates'
		}))
		.pipe(gulp.dest('src/js'))
		.pipe(gulpRename('zpz-md-calendar.templates.js'));
});

/**
 * Used for minifying and uglifying CSS
 */
gulp.task('build-css', function() {
	return gulp.src(require('./config').files.css)
		.pipe(gulpConcat('zpz-md-calendar.css'))
		.pipe(gulp.dest('dist'))
		.pipe(gulpRename('zpz-md-calendar.min.css'))
		.pipe(gulpMinifyCss())
		.pipe(gulp.dest('dist'));
});

/**
 * Used for minifying and uglifying JS
 */
gulp.task('build-js', function() {
	return gulp.src(require('./config').files.js)
		.pipe(gulpConcat('zpz-md-calendar.js'))
		.pipe(gulp.dest('dist'))
		.pipe(gulpRename('zpz-md-calendar.min.js'))
		.pipe(gulpUglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('build-pre', function() {
	console.log('Build process for zpzMdCalendar starting...');
});

gulp.task('build-post', function() {
	setTimeout(function() {
		var fs = require('fs');
		console.info('Concatenated ' + require('./config').files.html.length + ' HTML files into 1 JS file.');
		console.info('Concatenated ' + require('./config').files.js.length + ' JS files.');
		console.info('Concatenated ' + require('./config').files.css.length + ' CSS files.');
		var jsSize = fs.statSync('dist/zpz-md-calendar.min.js')['size'],
			cssSize = fs.statSync('dist/zpz-md-calendar.min.css')['size'],
			totalSize = jsSize + cssSize,
			size = ['bytes','Kb', 'Mb', 'Gb', 'Tb'],
			sizeCounter = 0;
		while(jsSize >= 1024) {
			jsSize /= 1024;
			++sizeCounter;
		}
		console.info('Total JS  | ' + (Math.round(jsSize * 1000) / 1000) + ' ' + size[sizeCounter]);
		sizeCounter = 0;
		while(cssSize >= 1024) {
			cssSize /= 1024;
			++sizeCounter;
		}
		console.info('Total CSS | ' + (Math.round(cssSize * 1000) / 1000) + ' ' + size[sizeCounter]);
		sizeCounter = 0;
		while(totalSize >= 1024) {
			totalSize /= 1024;
			++sizeCounter;
		}
		console.info('Total Size | ' + (Math.round(totalSize * 1000) / 1000) + ' ' + size[sizeCounter]);
	}, 1000);
})

/**
 * Convenience method for compiling all CSS and JS
 */
gulp.task('build', ['build-pre', 'build-html', 'build-css', 'build-js', 'build-post'], function() { });