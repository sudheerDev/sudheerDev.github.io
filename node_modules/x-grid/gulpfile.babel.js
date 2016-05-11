// generated on 2016-04-07 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import sassdoc from 'sassdoc';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('src/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true}));
});

gulp.task('minify-css', function() {
  return gulp.src('dist/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'minify-css'], () => {
  gulp.watch('src/**/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});


gulp.task('sassdoc', function () {
  var options = {
    dest: 'docs',
    verbose: true,
    display: {
      access: ['public', 'private'],
      alias: true,
      watermark: true,
    },
    groups: {
      foo: 'Foo group',
      bar: 'Bar group',
    }
  };
  return gulp.src('src/*.scss')
    .pipe(sassdoc(options));
});
