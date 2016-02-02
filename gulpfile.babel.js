import gulp     from 'gulp';
import loader   from 'gulp-load-plugins';
import tasks    from './gulp/index';
import config   from './config';

const plugins = loader({
  pattern: ['vinyl-*', 'del', 'browserify', 'watchify', 'babelify', 'gulp-*', 'gulp.*'],
  rename: {'vinyl-source-stream': 'source'}
});

gulp.task('build',    ['default']);
gulp.task('default',  ['clean', 'vendor', 'es6', 'less', 'jade']);
gulp.task('es6',      tasks.es6({gulp, plugins, config}));
gulp.task('vendor',   tasks.vendor({gulp, plugins, config}));
gulp.task('clean',    tasks.clean({gulp, plugins, config}));
gulp.task('less',     tasks.less({gulp, plugins, config}));
gulp.task('jade',     tasks.jade({gulp, plugins, config}));
gulp.task('watch',    tasks.watch({gulp, plugins, config}));

// gulp.task('less', function () {

// 	return gulp.src(conf.less.src)
// 		.on('error', gutil.log)
// 		// .pipe(sourcemaps.init())
// 		.pipe(less())
// 		// .pipe(sourcemaps.write(conf.less.srcMaps))
// 		.pipe(gulp.dest(conf.less.dest))
// 		// .pipe(filesize());

// 	// return build
// 	// 			.less(gulp.src(conf.less.src))
// });

// gulp.task('less2', function () {
// 	return gulp.src(['client/less/**/*.less']) //path to your main less file
// 		.on('error', gutil.log)
// 		// .pipe(sourcemaps.init({loadMaps: secrets.debug}))
// 		.pipe(less())
// 		.pipe(filesize())
// 		.pipe(gulp.dest(conf.less.dest)) // your output folder
// });

// gulp.task('vendor', function() {
// 	return
// 		// .pipe(filesize())

// });

// gulp.task('jshint', function(done) {
// 	var stream = gulp.src(['client/**/*.js', 'lib/**/*.js', 'server/**/*.js', '!**/test/**/*.js', '!./node_modules', '!./bower_components'])
// 	// var stream = gulp.src(['./**/*.js', '!node_modules', '!bower_components'])
// 		.pipe(jshint())
// 		.pipe(jshint.reporter(stylish))
// });

// gulp.task('js', function () {
//   var browserified = transform(function(filename) {
//     var b = browserify(filename, {
//     	'fullPaths': secrets.debug,
// 			'debug': secrets.debug,
// 			'cache': {},
// 			'packageCache': {}
//     });
//     return b.bundle();
//   });
//   return gulp.src(conf.browserify.src)
//     .pipe(browserified)
//     .pipe(uglify())
//     .pipe(gulp.dest(conf.browserify.dest));
// });

// gulp.task('angular', function(done) {
// 	var browserified = transform(function(filename) {
// 		var b = browserify(filename, {
// 			'fullPaths': secrets.debug,
// 			'debug': secrets.debug,
// 			'basedir': __dirname,
// 			'cache': {},
// 			'packageCache': {}
// 		})
// 		.transform(babelify);
// 		// b.add(filename);
// 		return b.bundle();
// 	});

// 	var stream = gulp.src(conf.browserify.src)
// 		// .pipe(jshint())
// 		// .pipe(jshint.reporter(stylish))
// 		// .pipe(filesize())
// 		.on('error', gutil.log)
// 		.pipe(browserified)
// 		.pipe(buffer())
// 		// .pipe(sourcemaps.init({loadMaps: secrets.debug}))
// 		// .pipe(gulp.dest(conf.browserify.dest))
// 		// .pipe(sourcemaps.write(conf.browserify.srcMaps))
// 		// .pipe(filesize())
// 		// .pipe(uglify())
// 		.pipe(rename('app.min.js'))
// 		// .pipe(source(path.basename(conf.browserify.src.replace('.js', '.min.js'))))
// 		.pipe(gulp.dest( conf.browserify.dest ))
// 	done()
// 	// return stream;
// });

// gulp.task('build', function (callback) {
// 	runSequence(['js', 'less2', 'vendor'],
// 		callback)
// });

// gulp.task('default', ['build']);

