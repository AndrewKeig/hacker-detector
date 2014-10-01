/*jshint camelcase:false*/

'use strict';

module.exports = function mocha_istanbul(grunt) {
	grunt.loadNpmTasks('grunt-mocha-istanbul');

	return {
        coverage: {
            src : 'test',
            options: {
                recursive : true
            }
        }
	};
};