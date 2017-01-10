var gulp             = require('gulp'),
    compass          = require('gulp-compass'),
    autoprefixer     = require('gulp-autoprefixer'),
    minifycss        = require('gulp-minify-css'),
    concatcss        = require('gulp-concat-css'),
    uglify           = require('gulp-uglify'),
    rename           = require('gulp-rename'),
    concat           = require('gulp-concat'),
    notify           = require('gulp-notify'),
    plumber          = require('gulp-plumber'),
    path             = require('path'),
    spritesmith      = require('gulp.spritesmith'),
    livereload       = require('gulp-livereload'),
    http             = require('http'),
    st               = require('st'),
    clean            = require('gulp-clean'),
    del              = require('del'),
    sass             = require('gulp-sass'),
    browserSync      = require('browser-sync'),
    inject           = require('gulp-inject'),
    jshint           = require('gulp-jshint'),
    imagemin         = require('gulp-imagemin'),
    historyApiFallback = require('connect-history-api-fallback');



//the title and icon that will be used for the Gulp notifications
var notifyInfo = {
    title: 'Gulp',
    icon: path.join(__dirname, 'gulp.png')
};

//error notification settings for plumber
var plumberErrorHandler = { errorHandler: notify.onError({
    title: notifyInfo.title,
    icon: notifyInfo.icon,
    message: "Error: <%= error.message %>"
})};


// var paths = {
//     sass : [scssPath + '/main.scss']
// }


gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
   gulp.src("assets/build/**.*")
      .pipe(clean());
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      middleware: [ historyApiFallback() ]
    }
  });
});


gulp.task('sass' , function() {

    return gulp.src('assets/src/sass/bootup.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('assets/build/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({ message: 'Styles task complete' }));

});

gulp.task('sass-critical' , function() {

    return gulp.src('assets/src/sass/critical.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('critical.min.css'))
        .pipe(gulp.dest('assets/build/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({ message: 'Styles task complete' }));

});

gulp.task('scripts', function() {
    return gulp.src(['assets/src/js/libs/*.js', 'assets/src/js/angular/angular.js', 'assets/src/js/angular/angular-route.js', 'assets/src/js/angular/angular-resource.js', 'assets/src/js/angular/angular-sanitize.js', 'assets/src/js/angular/modules/*.js', 'assets/src/js/app.js', 'assets/src/js/angular/directives/*.js', 'assets/src/js/angular/controllers/*.js', 'assets/src/js/angular/services/*.js'])
        // .pipe(plumber(plumberErrorHandler))
        .pipe(jshint('.jshintrc'))
        .pipe(concat('app.js'))
        .pipe(rename('app.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('assets/build/js'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// gulp.task('sprite', function () {
//     var spriteData = gulp.src(imagePath+'/icons/*.png').pipe(spritesmith({
//         imgName: 'icons.png',
//         cssName: 'icons.css',
//         algorithm: "binary-tree",
//         engine: 'pngsmith',
//         cssTemplate: 'icons.mustache',
//         padding: 0
//     }));
//     spriteData.img.pipe(gulp.dest(imagePath));
//     spriteData.css.pipe(gulp.dest(cssPath));

//     var spriteData2 = gulp.src(imagePath+'/icons@2/*.png').pipe(spritesmith({
//         imgName: 'icons@2.png',
//         cssName: 'icons@2.css',
//         algorithm: "binary-tree",
//         engine: 'pngsmith',
//         cssTemplate: 'icons.mustache',
//         padding: 0
//     }));
//     spriteData2.img.pipe(gulp.dest(imagePath));
//     spriteData2.css.pipe(gulp.dest(cssPath));
// });


gulp.task('imagemin' , function () {
    return gulp.src('assets/src/img/**/*')
        .pipe(gulp.dest('assets/build/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('watch', function() {
    gulp.watch(['assets/src/sass/*.scss'], ['sass']);
    gulp.watch(['assets/src/sass/critical.scss'], ['sass-critical']);
    gulp.watch('assets/src/img/**/*', ['imagemin']);
   gulp.watch('assets/src/js/*.js', ['scripts']);
   gulp.watch('assets/src/js/libs/*.js', ['scripts']);
   gulp.watch('assets/src/js/angular/directives/*.js', ['scripts']);
   gulp.watch('assets/src/js/angular/controllers/*.js', ['scripts']);
   gulp.watch('assets/src/js/angular/modules/*.js', ['scripts']);
   gulp.watch('assets/src/js/angular/services/*.js', ['scripts']);
});

gulp.task('default', ['sass', 'sass-critical', 'scripts', 'imagemin', 'watch']);