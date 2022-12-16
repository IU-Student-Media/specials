const currentDate = new Date().toLocaleDateString("en-us", {
  timeZone: "America/New_York",
  dateStyle: "long",
});

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      options: {
        stripBanners: true,
        separator: ";",
        banner: `/*! Last updated ${currentDate} - https://specials.idsnews.com/<%= pkg.name %> */\n`,
      },
      build: {
        src: ["js/**/*.js"],
        dest: "build/<%= pkg.name %>/js/bundle.js",
      },
    },
    copy: {
      files: { src: ["./assets/**/*"], dest: "build/<%= pkg.name %>/" },
    },
    cssmin: {
      files: {
        expand: true,
        src: "css/**/*.css",
        dest: "build/<%= pkg.name %>/",
        cwd: ".",
        rename: function (dest, src) {
          return dest + "/" + src.replace(".css", ".min.css");
        },
      },
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          "build/<%= pkg.name %>/index.html": "./index.html",
        },
      },
    },
    uglify: {
      options: {
        banner: `/*! Last updated ${currentDate} - https://specials.idsnews.com/<%= pkg.name %> */\n`,
      },
      build: {
        files: [
          {
            expand: true,
            src: "build/<%= pkg.name %>/js/bundle.js",
            dest: ".",
            cwd: ".",
            rename: function (dest, src) {
              return dest + "/" + src.replace(".js", ".min.js");
            },
          },
        ],
      },
    },
    jshint: {
      files: ["Gruntfile.js", "js/**/*.js"],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
        },
        esversion: 6,
      },
    },
    watch: {
      js: {
        files: ["js/**/*.js"],
        tasks: ["jshint", "concat", "uglify"],
      },
      css: {
        files: ["css/**/*.css"],
        tasks: ["cssmin"],
      },
      html: {
        files: ["./index.html", "./part1.html", "./part2.html"],
        tasks: ["htmlmin"],
      },
      assets: {
        files: ["./assets/**/*"],
        tasks: ["copy"],
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.registerTask("test", ["jshint"]);

  grunt.registerTask("default", [
    "jshint",
    "htmlmin",
    "cssmin",
    "copy",
    "concat",
    "uglify",
  ]);
};
