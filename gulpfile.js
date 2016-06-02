var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    rsync = require('gulp-rsync');

gulp.task('deploy', function() {
  gulp.src('public/**')
    .pipe(rsync({
      root: 'public_html/',
      hostname: 'prasim@166.62.10.183',
      destination: 'public_html/'
    }));
});

gulp.task('default',['watch']);

gulp.task('copyHTML',function() {
  gulp.src('source/*.html').pipe(gulp.dest('public'));
});
gulp.task('jshint', function(){
    return gulp.src('source/javascript/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('sass', function() {
    return gulp.src('source/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/scss'))
        .pipe(browserSync.reload({
          stream: true
        }))
});
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'prasim1'
    },
  })
})
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('public/scss/**/*.scss', ['sass']); 
  // Other watchers
});