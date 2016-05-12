var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// Gulp Sass Task
gulp.task('sass', function() {
  gulp.src('app/scss/**/*.{scss,sass}')
    // Initializes sourcemaps
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
      }))
    // Writes sourcemaps into the CSS file
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(reload({ stream:true }));
});

// Watch scss folder for changes
gulp.task('watch', function() {
  // Watches the scss folder for all .scss and .sass files
  // If any file changes, run the sass task
  gulp.watch('app/scss/*.{scss,sass}', ['sass'])
});


gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['app/scss/*.scss', 'app/index.html'], ['sass']);
});
