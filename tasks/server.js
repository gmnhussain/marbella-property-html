const gulp = require("gulp");
const { watch } = require("gulp");
const browserSync = require("browser-sync").create();

// include tasks
const html = require("./task-view");
const css = require("./task-style");
const js = require("./task-script");

const reload = (done) => {
  browserSync.reload();
  done();
};

let serve = (done) => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  watch(
    ["./src/**/*.html"],
    gulp.series(html.views, reload)
  );

  watch(
    ["./src/scss/**/*.scss"],
    gulp.series(css.beautify, css.minify, reload)
  );

  watch(
    ["./src/js/**/*.js"],
    gulp.series(js.beautify, js.minify, reload)
  );

  // Initial build, then signal serve is ready
  return gulp.series(html.views, css.beautify, css.minify, js.beautify, js.minify)(done);
};

exports.serve = serve;
