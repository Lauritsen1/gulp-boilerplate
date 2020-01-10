var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var connect = require("gulp-connect");
var recompress = require("imagemin-jpeg-recompress");


function imageTask(){
	return gulp.src("src/img/*")
	.pipe(imagemin([
		imagemin.jpegtran({progressive:true}),
		recompress({
			min:40,
			max:90,
			target:0.5
		})
	]))
	.pipe(gulp.dest("dist/img"))
	.pipe(connect.reload());
};


function watchImg(){
	return gulp.watch("src/img/*", {ignoreInitial:false}, imageTask);
}



module.exports = {
	imageTask,
	watchImg
}