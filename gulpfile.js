var gulp = require('gulp')
var ts = require('gulp-typescript')
var concat = require('gulp-concat')
var stylus = require('gulp-stylus')
var cssBase64 = require('gulp-css-base64');
var uglify = require('gulp-uglify')
var watch = require('gulp-watch')

// var browserify = require("browserify");
// var source = require('vinyl-source-stream');
// var tsify = require("tsify");
// var paths = {
//   pages: ['./src/*.html']
// }

// gulp.task("copyHtml", function () {
//   return gulp.src(paths.pages)
//     .pipe(gulp.dest("dist"));
// });

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
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
  // return browserify({
  //   basedir: '.',
  //   debug: true,
  //   entries: ['src/ts/tetris.ts'],
  //   cache: {},
  //   packageCache: {}
  // })
  //   .plugin(tsify)
  //   .bundle()
  //   .pipe(source('bundle.js'))
  //   .pipe(gulp.dest("dist/js"))
})

// pc版
gulp.task('stylusHandle', function () {
  return gulp.src([
    './src/stylus/tetris.styl'
  ])
    .pipe(cssBase64())
    // .pipe(concat('tetris.styl'))
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./dist/css'))
})


gulp.task('watch', function () {
  gulp.watch('./src/ts/*.ts', ['tsHandle'])
  gulp.watch('./src/stylus/*.styl', ['stylusHandle'])
})

gulp.task('default', ['tsHandle', 'stylusHandle', 'watch'])
