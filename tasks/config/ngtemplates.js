module.exports = function(grunt) {

  grunt.config.set('ngtemplates', {
    djAnswers : {
      cwd : 'src',
      src : '**/**.html',
      dest : 'build/templates.js',
      options : {
        htmlmin : '<%= htmlmin.djAnswers %>'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-angular-templates');
}