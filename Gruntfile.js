'use strict';

module.exports = function (grunt) {

    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    grunt.registerTask('lint',        [ 'jshint' ]);
    grunt.registerTask('test',        [ 'jshint', 'mochacli:unit' ]);
    grunt.registerTask('coverage',    [ 'jshint', 'mocha_istanbul:coverage' ]);
};