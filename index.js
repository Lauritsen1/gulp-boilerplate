#!/usr/bin/env node
var fs = require('fs');
var path = require("path");
var mkdir = require("mkdirp");
var { exec } = require("child_process");

var TEMPLATE_DIR = path.join(__dirname, "pkg"); // laver sti helt fra C drevet og frem til pkg mappen i gulp-intro mappen

var MODE_0666 = parseInt('0666', 8);

if (!fs.existsSync("./package.json")) {
    console.log("Please run <npm init> before you run this file");
    process.exit(1);
}

function copyFile(from, to) {
    write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'));
}

function copyFiles(fromDir, toDir) {
    fs.readdirSync(path.join(TEMPLATE_DIR, fromDir)).forEach(function (file) {
        if (fs.lstatSync(path.join(TEMPLATE_DIR, fromDir, file)).isFile()) {
            copyFile(path.join(fromDir, file), path.join(toDir, file));
        }
    });
}

function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    console.log('   \x1b[36mcreate\x1b[0m : ' + file);
}

mkdir.sync("./tasks");
mkdir.sync("./src");
mkdir.sync("./src/html");
mkdir.sync("./src/html/layouts");
mkdir.sync("./src/scss");
mkdir.sync("./src/js");
mkdir.sync("./src/img");
mkdir.sync("./src/media");

copyFiles("tasks", "./tasks");
copyFiles("src/html", "./src/html");
copyFiles("src/html/layouts", "./src/html/layouts");
copyFiles("src/scss", "./src/scss");
copyFiles("src/scss", "./src/scss");
copyFiles("src/js", "./src/js");
copyFiles("src/img", "./src/img");
copyFiles("src/media", "./src/media");
copyFile("gulpfile.js", "./gulpfile.js");


exec("npm i -D @babel/core @babel/preset-env gulp gulp-babel gulp-clean-css gulp-concat gulp-connect gulp-imagemin gulp-pug gulp-rename gulp-sass gulp-sourcemaps gulp-terser imagemin-jpeg-recompress", function (err, stdout, stderr) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log("Installing NPM packages. Please Wait!");

    console.log(stdout);
});