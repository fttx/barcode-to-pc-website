var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var fileinclude = require('gulp-file-include');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function () {
    return gulp.src('less/new-age.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function () {
    return gulp.src('css/new-age.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function () {
    return gulp.src(['js/new-age.js', 'js/config.js', 'js/utils.js', 'js/main.js', 'js/modals.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('build.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(header(banner, { pkg: pkg }))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function () {
    // gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
    //     .pipe(gulp.dest('vendor/bootstrap'))

    // gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    //     .pipe(gulp.dest('vendor/jquery'))

    gulp.src(['node_modules/simple-line-icons/*/*'])
        .pipe(gulp.dest('vendor/simple-line-icons'))

    gulp.src(['node_modules/html5-device-mockups/**/*'])
        .pipe(gulp.dest('vendor/html5-device-mockups/'))


    // gulp.src([
    //     'node_modules/font-awesome/**',
    //     '!node_modules/font-awesome/**/*.map',
    //     '!node_modules/font-awesome/.npmignore',
    //     '!node_modules/font-awesome/*.txt',
    //     '!node_modules/font-awesome/*.md',
    //     '!node_modules/font-awesome/*.json'
    // ])
    //     .pipe(gulp.dest('vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['fileinclude', 'less', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

gulp.task('fileinclude', function () {
    gulp.src(['html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('reload', () => {
    browserSync.reload();
})

// Dev task with browserSync
gulp.task('dev', ['fileinclude', 'browserSync', 'less', 'minify-css', 'minify-js'], function () {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('html/**/*.html', ['fileinclude', 'reload']);
    gulp.watch('js/**/*.js', browserSync.reload);
});
