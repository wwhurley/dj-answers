module.exports = function(grunt) {

  grunt.config.set('watch', {
    assets: {
      options: {
        livereload: true
      },
      // Assets to watch:
      files: ['src/**/*'],

      // When assets are changed:
      tasks: ['compileAssets']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};