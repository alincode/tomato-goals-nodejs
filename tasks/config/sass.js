module.exports = function(grunt) {
  grunt.config.set("sass", {
    dev: {
      options: {
        compass: true
      },
      files: [
        {
          expand: true,
          cwd: "assets/stylesheets/",
          src: ["importer.scss"],
          dest: ".tmp/public/stylesheets/",
          ext: ".css"
        }
      ]
    }
  });
  grunt.loadNpmTasks("grunt-contrib-sass");
};
