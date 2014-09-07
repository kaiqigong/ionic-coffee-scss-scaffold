var gulp = require('gulp'),
gutil = require('gulp-util'),
bower = require('bower'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
minifyCss = require('gulp-minify-css'),
rename = require('gulp-rename'),
sh = require('shelljs'),
coffee = require('gulp-coffee'),
inject = require("gulp-inject"),
angularFilesort = require('gulp-angular-filesort'),
bowerFiles = require('main-bower-files'),
base = {
  www: './www/'
},
paths = {
  sass: ['./www/scss/**/*.scss'],
  coffee: ['./www/coffee/**/*.coffee'],
  index: './www/index.html'
},
pathTransform = function (filepath) {
  arguments[0] = filepath.replace(/(\/|)www\//,'')
  return inject.transform.apply(inject.transform, arguments);
};
gulp.task('default', ['sass', 'coffee', 'index', 'watch']);

gulp.task('index', function () {
  gulp.src(paths.index)
  .pipe(inject(
    gulp.src(['./www/js/**/*.js'], {read: false}).pipe(angularFilesort())
    , {transform: pathTransform}
    ))
  .pipe(inject(
    gulp.src(
      bowerFiles({
        paths:{
          bowerDirectory: './www/lib'
        }
      })
      ) , {name: 'bower',transform: pathTransform}
    ))
  .pipe(gulp.dest('./www'));
});

gulp.task('sass', function(done) {
  gulp.src('./www/scss/ionic.app.scss')
  .pipe(sass())
  .pipe(gulp.dest('./www/css/'))
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest('./www/css/'))
  .on('end', done);
});

gulp.task('coffee', function(done) {
  gulp.src(paths.coffee)
  .pipe(coffee({bare: true}))
  .pipe(gulp.dest('./www/js/'))
  .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.index,['index']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
  .on('log', function(data) {
    gutil.log('bower', gutil.colors.cyan(data.id), data.message);
  });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
      );
    process.exit(1);
  }
  done();
});
