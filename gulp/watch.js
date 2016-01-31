
export default function ({gulp, plugins, config}) {
  config.watch = true;
  return (done) => {
    let vendorfiles = config.build.vendorSrc.concat(['./config/*.js'])

    gulp.watch(config.build.lessSrc,   ['less']);
    gulp.watch(config.build.jadeSrc,   ['jade']);
    gulp.watch(vendorfiles,            ['vendor']);
    gulp.watch(
      ['./app/**/*.js', './app/**/*.jade'],
      ['es6']);
    done();
  }
}
