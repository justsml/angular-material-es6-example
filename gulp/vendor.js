import gulp from 'gulp';

export default function ({plugins, config}) {
  return () => {
    return gulp.src(config.build.vendorSrc)
    .on('error', plugins.util.log)
    .pipe(plugins.uglify())
    // .pipe(plugins.concat())
    .pipe(plugins.rename('vendor.min.js'))
    .pipe(gulp.dest(config.outputPath+'/js'))
    .pipe(plugins.filesize())
  }
}




