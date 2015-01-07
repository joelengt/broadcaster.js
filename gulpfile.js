/**
 * @author www.juliocanares.com/cv
 * @email juliocanares@gmail.com
 */

var gulp = require('gulp');
var header = require('gulp-header');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

var paths = {
    jsSource: 'src/*.js',
    jsDist: 'bin/'
};

var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @license <%= pkg.license %>',
    ' * @author <%= pkg.author %>',
    ' */',
    ''].join('\n');

gulp.task('scripts', function () {
    return gulp.src(paths.jsSource)
        .pipe(uglify())
        .pipe(concat('broadcaster.min.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(paths.jsDist));
});


gulp.task('watch', function () {
    gulp.watch(paths.jsSource, ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);
