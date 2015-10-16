/// <reference path="src/appjs/timercallback.js" />
// Karma configuration
// Generated on Fri Oct 16 2015 08:18:58 GMT+0200 (Środkowoeuropejski czas letni)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine-jquery', 'jasmine'],


        // list of files / patterns to load in the browser
        files: [
            { pattern: 'wwwroot/lib/**/*.js', included: false },
            { pattern: 'wwwroot/lib/jquery.js', included: true },
            { pattern: 'wwwroot/lib/bootstrap/**/bootstrap.js', included: true },
            { pattern: 'wwwroot/lib/underscore.js', included: true },
            { pattern: 'wwwroot/lib/backbone.js', included: true },
            { pattern: 'src/appJs/**/*.js', included: true },
            { pattern: 'tests/**/*Spec.js', included: true }
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Firefox', 'PhantomJS', 'IE_no_addons', 'SlimerJS'],
        browsers: ['PhantomJS'],

        customLaunchers: {
            chrome_without_security: {
                base: "Chrome",
                flags: ["--disable-web-security"]
            },
            IE9: {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE9'
            },
            IE8: {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE8'
            },
            IE_no_addons: {
                base: 'IE',
                flags: ['-extoff']
            }
        },

        //kill browser if it does not capture in given time [ms]
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Capture all console output and pipe it to the terminal
        client: { captureConsole: true }
    })
}
