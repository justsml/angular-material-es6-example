
export default function ({gulp, plugins, config}) {
  return () => {
    return gulp.src(config.build.assetsSrc)
    .on('error', plugins.util.log)
    // .pipe(plugins.copy(config.outputPath+'/assets'))
    .pipe(gulp.dest(config.outputPath+'/assets'))
  }
}




