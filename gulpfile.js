'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifyjs = require('gulp-uglify'),
    rename = require('gulp-rename'),
    uglifycss = require('gulp-uglifycss'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    maps = require('gulp-sourcemaps');

function compileStylus() {
    return gulp.src('public/stylus/stylesheet.styl')
        .pipe(maps.init())
        .pipe(stylus())
        .pipe(maps.write('.'))
        .pipe(gulp.dest('public/css/'));
}
function concatCSS() {
    return gulp.src([
        'public/css/stylesheet.css',
        'public/css/normalize.css'])
        .pipe(concat('application.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))        
        .pipe(gulp.dest('public/css'));
}
function minifyCSS() {
    return gulp.src('public/css/application.css')
        .pipe(uglifycss())
        .pipe(rename('application.min.css'))
        .pipe(gulp.dest('public/css'));
}
gulp.task('compileStylus', compileStylus);
gulp.task('concatCSS', concatCSS);
gulp.task('minifyCSS', minifyCSS);

function concatJS() {
    return gulp.src('public/js/main.js')
        .pipe(maps.init())
        .pipe(concat('frontend.js'))
        .pipe(maps.write('.'))
        .pipe(gulp.dest('public/js'));
}
function minifyJS() {
    return gulp.src('public/js/frontend.js')
        .pipe(uglifyjs())
        .pipe(rename('frontend.min.js'))
        .pipe(gulp.dest('public/js'));
}
gulp.task('concatJS', concatJS)
gulp.task('minifyJS', minifyJS);

gulp.task('default', gulp.series('compileStylus', 'concatCSS', 'concatJS', gulp.parallel( 'minifyCSS', 'minifyJS')));