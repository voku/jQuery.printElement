/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */<%= "\\n" %>',
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>',
        separator: ';',
        stripBanners: true
      },
      dist: {
        src: ['src/jquery.printelement.js'],
        dest: 'dist/jquery.printelement.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      files: '<%= meta.files %>',
      tasks: ['jshint', 'qunit']
    },
    jshint: {
      all: ['<%= meta.files %>'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          QUnit: true,
          ok: true
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        mangle: {
          except: ['jQuery']
        }
      },
      dist: {
        wrap: true,
        src: ['<%= concat.dist.dest %>'],
        dest: 'dist/jquery.printelement.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('develop', ['watch']);
};
