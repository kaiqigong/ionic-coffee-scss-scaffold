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
  index: './www/index.html',
},
// you can change including files by editing the bower.json
bowerPath = bowerFiles({
  paths:{
    bowerDirectory: './www/lib'
  }
});
gulp.task('default', ['sass', 'coffee', 'index', 'watch']);

gulp.task('index', function () {
  console.log(bowerPath);
  gulp.src(paths.index)
  .pipe(inject(
    gulp.src(['./www/js/**/*.js','./www/css/**/*.css'], {read: false}).pipe(angularFilesort())
    , {relative: true, ignorePath: '/www/', addRootSlash: false}
    ))
  .pipe(inject(
    gulp.src(bowerPath)
    , {name: 'bower', relative: true, ignorePath: '/www/', addRootSlash: false}
    ))
  .pipe(gulp.dest('./www'));
});

gulp.task('sass', function(done) {
  gulp.src('./www/scss/app.scss')
  .pipe(inject(gulp.src(['./www/scss/**/*.scss','!./www/scss/app.scss'], {read: false})
    ,{starttag: '// inject:scss',
    endtag: '// endinject',
    transform: function (filepath) {
      console.log(filepath);
      return '@import "' + filepath + '";';
    },relative: true}))
  .pipe(gulp.dest('./www/scss/'))
  .pipe(sass())
  .pipe(gulp.dest('./www/css/'))
  // minify
  // .pipe(minifyCss({
  //   keepSpecialComments: 0
  // }))
  // .pipe(rename({ extname: '.min.css' }))
  // .pipe(gulp.dest('./www/css/'))
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
  gulp.watch([paths.index, 'bower.json'],['index']);
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
