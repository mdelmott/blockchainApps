var gulp = require('gulp'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    Server = require('karma').Server,
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    nodemon = require('gulp-nodemon');

gulp.task('serve', function() {
    nodemon({
        script:"server/app.js"
    });
});

gulp.task('connect', function () {
    connect.server({
        port: 8000,
        name: 'TestApp',
        root: 'dist'
    });
});

gulp.task('initialize',function () {
    gulp.src('./client/src/assets/**')
        .pipe(gulp.dest('./dist/assets/'));
    gulp.src('./client/src/app/index.html')
        .pipe(gulp.dest('./dist/'));
    gulp.src('./client/src/app/**/Views/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./dist/views/'));
    gulp.src('./node_modules/bootstrap/dist/css/*.min.css')
        .pipe(gulp.dest('./dist/assets/css/'))
});

gulp.task('browserify', function () {
   return browserify('./client/src/app/app.js')
       .bundle()
       .pipe(source('bundle.js'))
       .pipe(gulp.dest('./dist/'));
});

gulp.task('deploy', function () {
   connect.server({
       port: process.env.VCAP_APP_PORT || 8000,
       name: 'blockchainTest2',
       root: 'dist'
   });
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('build', ['serve', 'browserify', 'initialize', 'connect']);
gulp.task('default', ['browserify', 'initialize']);