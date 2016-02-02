
export default function ({gulp, plugins, config}) {
  return () => {
    return gulp.src(config.build.lessSrc)
    .on('error', plugins.util.log)
    .pipe(plugins.less({ debug: config.debug }))
    // .pipe(plugins.concat())
    // .pipe(plugins.rename('site.min.css'))
    .pipe(gulp.dest(config.outputPath+'/style'))
    .pipe(plugins.filesize())
  }
}




