var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('serve', function() {
    nodemon({
       script:"app.js"
    });
});