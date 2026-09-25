const gulp = require("gulp");
const concat = require("gulp-concat");
const beautify = require("gulp-beautify");
const fs = require("fs");
const path = require("path");

const sections = {
  pages: ["./src/views/pages.html"],
  "about-us": [
    "./src/views/header/head.html", //
    "./src/views/body/about-us.html",
    "./src/views/header/header.html",
    "./src/views/about-us.html",
    "./src/views/footer/footer.html",
    "./src/views/footer/foot.html",
  ],
  "collection-detail": [
    "./src/views/header/head.html", //
    "./src/views/body/collection-detail.html",
    "./src/views/header/header.html",
    "./src/views/collection-detail.html",
    "./src/views/footer/footer.html",
    "./src/views/footer/foot.html",
  ],
};

const createTask = (key) => {
  gulp.task(key, () => {
    return gulp
      .src(sections[key], { allowEmpty: true })
      .pipe(concat(key + ".html"))
      .pipe(
        beautify.html({
          indent_size: 2,
        })
      )
      .pipe(gulp.dest("./dist"));
  });
};

let tasks = [];

for (const key in sections) {
  createTask(key);
  tasks.push(key);
}

// Keep homepage in sync with the working collection-detail page
const copyIndex = (done) => {
  const from = path.join(__dirname, "../dist/collection-detail.html");
  const to = path.join(__dirname, "../dist/index.html");

  if (!fs.existsSync(from)) {
    done(new Error("collection-detail.html was not built before copyIndex"));
    return;
  }

  fs.copyFileSync(from, to);
  done();
};

gulp.task("index", copyIndex);
tasks.push("index");

exports.views = gulp.series(...tasks);
