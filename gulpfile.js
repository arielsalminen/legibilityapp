var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var reload = browserSync.reload;

gulp.task('sass', function() {
  return sass('scss/main.scss')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
    .pipe(reload({ stream:true }));
});

gulp.task('uglify', function(){
  return gulp.src(['scripts/feature.js', 'scripts/jquery.js', 'scripts/select2.min.js', 'scripts/draggable.js', 'scripts/fonts.js', 'scripts/webfontloader.js', 'scripts/controls.js', 'scripts/save.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('scripts'));
});

// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', ['sass', 'uglify'], function() {
  browserSync({
    server: {
      baseDir: ''
    },
    notify: false
  });

  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('scripts/controls.js', ['uglify']);
  gulp.watch('scripts/save.js', ['uglify']);
});
