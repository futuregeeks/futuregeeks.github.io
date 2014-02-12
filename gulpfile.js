// include gulp and required plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');

// run jekyll build – http://stackoverflow.com/a/21403905
gulp.task('jekyll-build', function () {
  require('child_process').spawn('jekyll', ['build'], {stdio: 'inherit'});
});

// compile sass and check for errors
gulp.task('compile-sass', function() {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .on("error", notify.onError(function (error) {
            return "Dang! " + error.message;
        }))
        .pipe(gulp.dest('assets/css'))
});

// start a server and watch for html and css changes
gulp.task('browser-sync', function() {  
    browserSync.init(["_site/assets/css/**/*.css", "_site/**/*.html"], {
        server: {
            baseDir: "./_site/"
        }
    });
});

// watch for changes
gulp.task('default', ['jekyll-build', 'compile-sass', 'browser-sync'], function () {  
    gulp.watch(["assets/sass/**/*.scss"], ['compile-sass', 'jekyll-build']);
    gulp.watch([ "*.yml", "*.md", "*.html", "_posts/*.md", "_includes/*.html", "_layouts/*.html"], ['jekyll-build']);
});