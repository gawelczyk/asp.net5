/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
less = require('gulp-less');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task("copy", function () {
    gulp.src("./node_modules/openlayers/dist/ol.js").pipe(gulp.dest("./wwwroot/lib"));
    gulp.src("./node_modules/openlayers/dist/ol.css").pipe(gulp.dest("./wwwroot/css"));
    gulp.src("./bower_components/jquery/dist/jquery.js").pipe(gulp.dest("./wwwroot/lib"));
    gulp.src("./bower_components/bootstrap/dist/js/bootstrap.js").pipe(gulp.dest("./wwwroot/lib"));
    gulp.src("./bower_components/bootstrap/dist/css/*.css").pipe(gulp.dest("./wwwroot/css"));
});

gulp.task("devJsCopy", function () {
    gulp.src("./src/js/**").pipe(gulp.dest("./wwwroot/js/"));
});

gulp.task("less", function () {
    gulp.src("./src/less/main.less")
    .pipe(less({ compress: true }))
    .pipe(gulp.dest("./wwwroot/css"));
});

gulp.task("watch", function () {
    gulp.watch("./src/js/*.js", ["devJsCopy"]);
    gulp.watch("./src/less/*.less", ["less"]);
});

