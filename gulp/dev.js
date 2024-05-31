const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const gulpGroupCssMediaQueries = require('gulp-group-css-media-queries');
const imageminGiflossy = require("imagemin-giflossy");

const imagemin = require('gulp-imagemin');
const imageminPngquant  = require("imagemin-pngquant");
const imageminZopfli  = require("imagemin-zopfli");
const imageminMozjpeg  = require("imagemin-mozjpeg");
const yargs  = require("yargs");
const gulpif  = require("gulp-if");

const concat = require("gulp-concat");
const uglify = require('gulp-uglify');

const merge = require('merge-stream');




const argv = yargs.argv,
	production = !!argv.production;

gulp.task('clean:dev', function (done) {
	if (fs.existsSync('./build/')) {
		return gulp
			.src('./build/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

gulp.task('html:dev', function () {
	return (
		gulp
			.src(['./src/views/index.pug', './src/views/pages/**/*.pug'])
			.pipe(pug({
				pretty: true
			}))
			.pipe(fileInclude(fileIncludeSetting))
			.pipe(gulp.dest('./build/'))
			.pipe(browserSync.stream())
	);
});

gulp.task('sass:dev', function () {
	return (
		gulp
			.src(['./src/styles/*.scss','./src/components/**/*.scss'])
			.pipe(plumber(plumberNotify('SCSS')))
			.pipe(sass())
			.pipe(concat('main.css'))
			.pipe(gulp.dest('./build/css/'))
			.pipe(browserSync.stream())
	);
});

gulp.task('images:dev', function () {
	return gulp
		.src('./src/img/**/*', { encoding: false })
		// .pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest('./build/img/'));
});

gulp.task('fonts:dev', function () {
	return gulp
		.src('./src/fonts/**/*')
		.pipe(gulp.dest('./build/fonts/'));
});

gulp.task('files:dev', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(gulp.dest('./build/files/'));
});

gulp.task('js:dev', function () {
	return merge(
		gulp
			.src('./src/js/lib/*.{js,json}')
			.pipe(gulp.dest('./build/js/lib/'))
			.pipe(browserSync.stream()),
		gulp
			.src('./src/js/vendor/*.js')
			.pipe(concat('vendor.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./build/js/'))
			.pipe(browserSync.stream()),
		gulp
			.src(['./src/components/**/*.{js,json}','./src/js/common/*.js'])
			.pipe(concat('common.js'))
			.pipe(gulp.dest('./build/js/'))
			.pipe(browserSync.stream()),
	)

});

const serverOptions = {
	livereload: true,
	open: false,
};

gulp.task('server:dev', function () {
	return gulp.src('./build/').pipe(server(serverOptions));
});

gulp.task('watch:dev', function () {
	gulp.watch('./src/styles/**/*.scss', gulp.parallel('sass:dev'));
	gulp.watch('./src/components/**/*.scss', gulp.parallel('sass:dev'));
	gulp.watch(['./src/blocks/**/*.pug','./src/data/**/*.pug','./src/views/**/*.pug','./src/components/**/*.pug'], gulp.parallel('html:dev'));
	gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
	gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
	gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
	gulp.watch(['./src/js/**/*.js','./src/components/**/*.js'], gulp.parallel('js:dev'));
});
