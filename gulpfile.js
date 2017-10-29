var gulp = require('gulp')
var ts = require('gulp-typescript')
var concat = require('gulp-concat')
var stylus = require('gulp-stylus')
var cssBase64 = require('gulp-css-base64');
var uglify = require('gulp-uglify')
var watch = require('gulp-watch')
var rename = require('gulp-rename')
var argv = require('yargs').argv
// Development
var isDev = argv.dev == 1 ? true : false

// ts convert to js
gulp.task('tsHandle', function () {
  return gulp.src([
    // './src/ts/util.ts',
    './src/ts/tetris.ts'
  ])
    // .pipe(concat('tetris.ts'))
    .pipe(ts({
      noImplicitAny: true,
      outFile: 'tetris.js'
    }))
    .pipe(gulp.dest('./dist/js'))
})

// JavaScript Uglify
gulp.task('uglify', ['tsHandle'], function () {
  return gulp.src('./dist/js/tetris.js')
    .pipe(rename('tetris.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
})

// Stylus Handle
gulp.task('stylusHandle', function () {
  return gulp.src([
    './src/stylus/tetris.styl'
  ])
    .pipe(cssBase64())
    // .pipe(concat('tetris.styl'))
    .pipe(stylus({
      // compress: true
    }))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('watch', function () {
  gulp.watch('./src/ts/*.ts', ['tsHandle'])
  gulp.watch('./src/stylus/*.styl', ['stylusHandle'])
})

if (isDev) {
  gulp.task('default', ['tsHandle', 'stylusHandle', 'watch'])
} else {
  gulp.task('default', ['uglify', 'stylusHandle'])
}

