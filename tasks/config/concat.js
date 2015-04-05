module.exports = function(grunt) {
  grunt.config.set('concat', {
    js: {
      src: ['src/index.js', 'src/**/*.js', 'build/templates.js'],
      dest: 'build/app.js'
    },
    css: {
      src: ['src/**/*.css'],
      dest: 'build/app.css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};