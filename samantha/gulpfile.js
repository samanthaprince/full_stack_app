'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('webpack-stream');

var paths = ['*.js', 'test/*.js'];

const sources = {
  html: __dirname +'/app/**/*.html',
  js:   __dirname + '/app/index.js',
  test: __dirname + '/test/unit/*-spec.js'
};

gulp.task('tasks running', function(){
  console.log('gulp is running');
});

gulp.task('eslint', function(){
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('webpack', function(){
  return gulp.src(__dirname + '/app/index.js')
    .pipe(webpack({
      watch: true,
      module: {
        loaders: [
          {test: /\.css$/, loader: 'style!css'}
        ]
      },
      output:{
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/build'));
});

// gulp.task('watch', function(){
//   gulp.watch(paths,['eslint']);
// });

gulp.task('bundle:dev', ()=> {
  return gulp.src(sources.js)
  .pipe(webpack({output: {filename: 'bundle.js'}}))
  .pipe(gulp.dest('./build'));
});

gulp.task('copy', ()=> {
  return gulp.src(sources.html)
  .pipe(gulp.dest('./build'));
});

gulp.task('bundle:test', ()=> {
  return gulp.src(sources.test)
  .pipe(webpack({output: {filename: 'test_bundle.js'}}))
  .pipe(gulp.dest('./test/unit'));
});

gulp.task('default',['tasks running', 'eslint', 'bundle:dev', 'copy']);
