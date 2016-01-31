
export default function ({gulp, plugins, config}) {
  return () => {
    return gulp.src(config.build.vendorSrc)
    .on('error', plugins.util.log)
    .on('end', () =>  plugins.util.log.bind(null, 'DONE - VENDOR SCRIPT!'))
    // .pipe(plugins.uglify())
    .pipe(plugins.if(!config.debug, plugins.uglify()))
    .pipe(plugins.if(config.debug, plugins.concat('vendor.min.js')))
    // .pipe(plugins.rename('vendor.min.js'))
    .pipe(plugins.filesize())
    .pipe(gulp.dest(config.outputPath+'/js/'))
  }
}




