/// <binding AfterBuild='copy' ProjectOpened='watch' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    less = require('gulp-less'),
    server = require('karma').Server;

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task("copy", function () {
    gulp.src("./bower_components/bootstrap/dist/**").pipe(gulp.dest("./wwwroot/lib/bootstrap"));
    gulp.src("./bower_components/jquery/dist/**").pipe(gulp.dest("./wwwroot/lib"));
    gulp.src("./bower_components/moment/moment.js").pipe(gulp.dest("./wwwroot/lib"));
    gulp.src("./bower_components/underscore/underscore.js").pipe(gulp.dest("./wwwroot/lib"));
    gulp.src("./bower_components/backbone/backbone.js").pipe(gulp.dest("./wwwroot/lib"));
});

gulp.task("devJsCopy", function () {
    gulp.src("./src/appJs/**").pipe(gulp.dest("./wwwroot/appJs/"));
});

gulp.task("less", function () {
    gulp.src("./src/less/custom.less")
    .pipe(less({ compress: true }))
    .pipe(gulp.dest("./wwwroot/css"));
});

gulp.task("watch", function () {
    gulp.watch("./src/less/*.less", ["less"]);
    gulp.watch("./src/appJs/*.js", ["devJsCopy"]);
});

gulp.task('test', function (done) {
    new server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['Firefox', 'IE_no_addons']
    }, done).start();
});

gulp.task('tdd', function (done) {
    new server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});
