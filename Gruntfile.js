module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-haml');

  grunt.registerTask('dev', ['browserify', 'eslint', 'haml', 'watch']);
  grunt.registerTask('build', ['browserify', 'eslint', 'haml']);

  grunt.initConfig({
    /**
     * Write ES6 today, compile it to ES5.
     */
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', { "presets": ["es2015"] }]
          ],
          browserifyOptions: { debug: true }
        },
        files: {
          'dist/app.js': ['src/scripts/**/*.js']
        }
      }
    },
    /**
     * Validates ES6 files via ESLint.
     */
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: 'src/scripts/**/*.js'
    },
    haml: {
      dist: {
        files: {
          'dist/index.html' : 'src/index.haml'
        }
      }
    },

    /**
     * Run predefined tasks whenever watched files are added,
     * modified or deleted.
     */
    watch: {
      scripts: {
        files: ['src/scripts/**/*.js', 'src/index.haml'],
        tasks: ['browserify', 'eslint', 'haml'],
        options: {
          livereload: 1337
        }
      },
    }
  });
};
