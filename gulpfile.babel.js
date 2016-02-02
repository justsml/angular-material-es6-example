import gulp     from 'gulp';
import loader   from 'gulp-load-plugins';
import tasks    from './build';
import config   from './config/build';

const plugins = loader({
  pattern: ['vinyl-*', 'del', 'browserify', 'watchify', 'babelify', 'gulp-*', 'gulp.*'],
  rename: {'vinyl-source-stream': 'source'}
});

gulp.task('build',    ['default']);
gulp.task('default',  ['clean', 'vendor', 'es6', 'less', 'jade', 'copy']);
gulp.task('clean',    tasks.clean({gulp, plugins, config}));
gulp.task('copy',     tasks.copy({gulp, plugins, config}));
gulp.task('es6',      tasks.es6({gulp, plugins, config}));
gulp.task('jade',     tasks.jade({gulp, plugins, config}));
gulp.task('less',     tasks.less({gulp, plugins, config}));
gulp.task('vendor',   tasks.vendor({gulp, plugins, config}));
gulp.task('watch',    tasks.watch({gulp, plugins, config}));
