/**
 * Created by mdelmott on 14/09/2016.
 */
// Karma configuration

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify','jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'client/src/app/app.js',
            './node_modules/angular-mocks/angular-mocks.js',
            'client/test/*.js'
        ],

        preprocessors: {
            './client/src/app/app.js' : ['browserify'],
            './client/test/*.js': ['browserify']
        },

        browserify: {
            debug: true
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'PhantomJS'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};