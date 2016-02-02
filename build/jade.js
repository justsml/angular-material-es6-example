
export default function ({gulp, plugins, config}) {
  return () => {
    return gulp.src(config.build.jadeSrc)
    .on('error', plugins.util.log)
    .pipe(plugins.jade({ pretty: config.debug }))
    .pipe(gulp.dest(config.outputPath+'/'))
    .pipe(plugins.filesize())
  }
}




