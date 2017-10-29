
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('sass', function () {
  return gulp.src('./sass-src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
});


gulp.task('serve',['sass'] ,function () {
    browserSync.init({
        server: "./",
        port:8080
    });
  gulp.watch('./sass-src/**/*.scss', ['sass']);
  gulp.watch("./js/**.js").on('change',browserSync.reload)
  gulp.watch("./*.html").on('change', browserSync.reload);
})

gulp.task('build:css', () => {
  const processors = [
    autoprefixer,
    cssnano
  ];
  return gulp.src('./sass-src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'));
})

gulp.task('default', ['serve']);
