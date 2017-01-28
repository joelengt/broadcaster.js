var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

var paths = {
    jsSource: 'index.js',
    jsDist: 'dist/'
};

gulp.task('scripts', function () {
    return gulp.src(paths.jsSource)
        .pipe(uglify())
        .pipe(concat('broadcaster.min.js'))
        .pipe(gulp.dest(paths.jsDist));
});

gulp.task('default', ['scripts']);
