module.exports = function(grunt) {

  grunt.config.set('connect', {
    server: {
      options: {
        port: 9001,
        livereload : true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
};