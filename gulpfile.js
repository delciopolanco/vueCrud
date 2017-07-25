var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    server = require('gulp-server-livereload'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    args = require('yargs').argv,
    config = require('./config'),
    isProduction = args.production ? true : false,
    appSrc = args.app === config.appAngular ? config.srcAngular : config.srcVue;

/**
 * Run clean task
 */
gulp.task('clean', function () {
    return gulp.src(config.deploy, {
        read: false
    }).pipe(clean());
});

// Fonts
gulp.task('fonts', function () {
    return gulp.src(['./node_modules/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest(config.deploy + config.fonts));
});

/**
 * Run libs task
 */
gulp.task('html', ['fonts'], function () {
    return gulp.src(appSrc + '/*.html')
        .pipe(useref())
        .pipe(gulpif(function (file) {
            return isProduction && gulpmatch(file, '*.js');
        }, uglify()))
        .pipe(gulpif(function (file) {
            return isProduction && gulpmatch(file, '*.css');
        }, minify()))
        .pipe(gulp.dest(config.deploy));
});

/**
 * Run livereload server
 */
gulp.task('webserver', function () {
    gulp.src(config.deploy)
        .pipe(server({
            open: true,
            livereload: true,
            livereload: {
                enable: true,
                defaultFile: 'index.html'
            }
        }));
});

/**
 * Run Services and Mongo DB
 */
gulp.task('startbackend', function () {
    nodemon({
        script: './server/bin/www',
        ext: '',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**', './angular/**', './vue/**']
    }).on('restart', function () {
        console.log('Restarting server');
    });
});

/**
 * Watchers
 */
gulp.task('watch', ['webserver', 'startbackend'], function () {
    gulp.watch(appSrc + '/*.html', ['html']);
    gulp.watch(appSrc + '/**/*.js', ['html']);
    gulp.watch(appSrc + '/**/*.css', ['html']);
});

// Build
gulp.task('default', ['html', 'watch']);