var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var cleanCSS = require("gulp-clean-css");


function scssTask(){
	return gulp.src("src/scss/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass().on("error", sass.logError))
	.pipe(concat('styles.css')) // compiler alle scss filer til en enkelt css fil
	.pipe(cleanCSS())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
}


function watchSCSS(){
	return gulp.watch("src/scss/*.scss", { ignoreInitial:false }, scssTask)
}

module.exports = {
	scssTask,
	watchSCSS
}