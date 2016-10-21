var gulp = require('gulp'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    Server = require('karma').Server,
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    nodemon = require('gulp-nodemon');

gulp.task('serve', function() {
    nodemon({
        script:"nodeApp/app.js"
    });
});

gulp.task('connect', function () {
    connect.server({
        port: 8000,
        name: 'TestApp',
        root: 'angularApp/dist'
    });
});

gulp.task('initialize',function () {
    gulp.src('./angularApp/src/assets/**')
        .pipe(gulp.dest('./angularApp/dist/assets/'));
    gulp.src('./angularApp/src/app/index.html')
        .pipe(gulp.dest('./angularApp/dist/'));
    gulp.src('./angularApp/src/app/**/Views/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./angularApp/dist/views/'));
    gulp.src('./angularApp/node_modules/bootstrap/dist/css/*.min.css')
        .pipe(gulp.dest('./angularApp/dist/assets/css/'))
});

gulp.task('browserify', function () {
   return browserify('./angularApp/src/app/app.js')
       .bundle()
       .pipe(source('bundle.js'))
       .pipe(gulp.dest('./angularApp/dist/'));
});

gulp.task('deploy', function () {
   connect.server({
       port: process.env.VCAP_APP_PORT || 8000,
       name: 'sampleAngular',
       root: './angularApp/dist'
   });
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('build', ['serve','browserify', 'initialize', 'connect']);
gulp.task('default', ['browserify', 'initialize', 'test']);